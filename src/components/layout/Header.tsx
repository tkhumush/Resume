import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-20 border-b border-slate-200">
      <nav className="navbar container mx-auto px-4 py-3">
        <Link href="/" className="text-2xl font-extrabold text-slate-900">
          Taymur Khumush
        </Link>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-sm font-medium">
          <Link href="/consulting" className="btn btn-soft btn-primary btn-sm">
            HR Consulting
          </Link>
          <Link href="/#portfolio" className="btn btn-soft btn-primary btn-sm">
            Portfolio
          </Link>
          <Link href="/contact" className="btn btn-gradient btn-primary btn-sm text-white">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
