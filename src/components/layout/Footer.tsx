const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-100 mt-16">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold">Taymur Khumush</p>
          <p className="text-sm text-slate-300">
            Consulting, workforce strategy, and tech-powered delivery.
          </p>
        </div>
        <p className="text-sm text-slate-400">&copy; 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
