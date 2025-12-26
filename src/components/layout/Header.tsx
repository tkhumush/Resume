'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from '../ThemeToggle';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-900 sticky top-0 z-20 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <nav className="navbar container mx-auto px-4 py-3 !bg-transparent">
        <Link href="/" className="text-2xl md:text-3xl lg:text-[2.2rem] font-extrabold text-slate-900 dark:text-white leading-none">
          Taymur Khumush
        </Link>
        <div className="flex-1" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 text-sm font-medium">
          <ThemeToggle />
          <Link href="/human_capital" className="btn btn-soft btn-primary btn-sm">
            Human Capital
          </Link>
          <Link href="/#work-projects" className="btn btn-soft btn-primary btn-sm">
            Power Platform
          </Link>
          <Link href="/#portfolio" className="btn btn-soft btn-primary btn-sm">
            Github Portfolio
          </Link>
          <Link href="/contact" className="btn btn-gradient btn-primary btn-sm text-white">
            Contact
          </Link>
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-soft btn-primary btn-md"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              // Close icon (X)
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/human_capital"
              className="btn btn-soft btn-primary btn-md w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Human Capital
            </Link>
            <Link
              href="/#work-projects"
              className="btn btn-soft btn-primary btn-md w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Power Platform
            </Link>
            <Link
              href="/#portfolio"
              className="btn btn-soft btn-primary btn-md w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Github Portfolio
            </Link>
            <Link
              href="/contact"
              className="btn btn-gradient btn-primary btn-md text-white w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
