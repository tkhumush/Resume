import { useEffect, useRef, useState } from 'react';
import {
  SimplePool,
  finalizeEvent,
  generateSecretKey,
  getPublicKey,
  nip04,
  type EventTemplate,
} from 'nostr-tools';
import Layout from '@/components/layout/Layout';

const relays = ['wss://relay.primal.net', 'wss://relay.damus.io'];

const contactPubkeyHex =
  'a4a9df1630ef1b2f22b3c5ba56a14773c2b99f7a9eafaca30d7d6f90767acd9f';

const ContactPage = () => {
  const poolRef = useRef(new SimplePool());
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [subject, setSubject] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [secretKey, setSecretKey] = useState<Uint8Array | null>(null);
  const [pubkey, setPubkey] = useState<string | null>(null);

  useEffect(() => {
    const pool = poolRef.current;
    return () => {
      pool.close(relays);
    };
  }, []);

  useEffect(() => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    setSecretKey(sk);
    setPubkey(pk);
  }, []);

  const handleSend = async () => {
    setStatus(null);
    setError(null);
    if (!secretKey || !pubkey) {
      setError('Generating keypair, please wait a moment and retry.');
      return;
    }
    if (!fullName.trim() || !subject.trim() || !message.trim() || !contactInfo.trim()) {
      setError('All fields are required.');
      return;
    }

    setSending(true);
    try {
      const content = `Name: ${fullName.trim()}\nSubject: ${subject.trim()}\nContact: ${contactInfo.trim()}\n\n${message.trim()}`;
      const encrypted = await nip04.encrypt(secretKey, contactPubkeyHex, content);
      const unsigned: EventTemplate = {
        kind: 4,
        created_at: Math.floor(Date.now() / 1000),
        tags: [['p', contactPubkeyHex]],
        content: encrypted,
      };

      const signed = finalizeEvent(unsigned, secretKey);
      const pubs = poolRef.current.publish(relays, signed);
      await Promise.all(pubs);

      setStatus('Message sent! You can close this tab or send another.');
      setMessage('');
      setFullName('');
      setSubject('');
      setContactInfo('');
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Failed to send message.';
      setError(msg);
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Send me a message</h1>
      <p className="mb-6 text-slate-700 dark:text-slate-300">
        If you find my resume interesting, send me a private message. Leave your email and I will reply back to you.
      </p>

      <div className="card bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700">
        <div className="card-body space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-900 dark:text-slate-300">Subject</span>
            </label>
            <input
              className="input input-bordered w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-semibold text-slate-900 dark:text-slate-300">Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full h-32 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and include any contact details you'd like me to use."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold text-slate-900 dark:text-slate-300">Full name</span>
              </label>
              <input
                className="input input-bordered w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold text-slate-900 dark:text-slate-300">Contact (email or phone)</span>
              </label>
              <input
                className="input input-bordered w-full bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Email or phone"
              />
            </div>
          </div>

          <button
            className="btn btn-primary btn-md text-white"
            onClick={handleSend}
            disabled={sending || !contactPubkeyHex}
          >
            {sending ? 'Sending…' : 'Send via Nostr'}
          </button>

          {status && <div className="text-sm text-success">{status}</div>}
          {error && <div className="text-sm text-error">{error}</div>}
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
