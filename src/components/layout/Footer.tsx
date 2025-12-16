const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-100 mt-16">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold">Taymur Khumush</p>
          <p className="text-sm text-slate-300 dark:text-slate-400">
            Human Capital collides with Programming!
          </p>
        </div>
        <p className="text-sm text-slate-400 dark:text-slate-500">&copy; 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
