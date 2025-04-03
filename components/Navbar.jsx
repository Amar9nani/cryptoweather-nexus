'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll for navbar styling
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    return pathname === path ? 'text-accent' : 'text-light-300 hover:text-white';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-500 shadow-md' : 'bg-dark-500 bg-opacity-80 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and title */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="ml-2 font-bold text-white text-lg hidden sm:block">CryptoWeather</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`${isActive('/')} text-sm font-medium`}>
              Dashboard
            </Link>
            <Link href="/city/london" className={`${isActive('/city/london')} text-sm font-medium`}>
              Weather
            </Link>
            <Link href="/crypto/bitcoin" className={`${isActive('/crypto/bitcoin')} text-sm font-medium`}>
              Crypto
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-light-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0 invisible'
      } overflow-hidden`}>
        <div className="px-4 py-3 space-y-2 bg-dark-400 shadow-md">
          <Link href="/" className={`block py-2 px-3 rounded-md ${isActive('/') === 'text-accent' ? 'bg-dark-300' : 'hover:bg-dark-300'}`}>
            Dashboard
          </Link>
          <Link href="/city/london" className={`block py-2 px-3 rounded-md ${isActive('/city/london') === 'text-accent' ? 'bg-dark-300' : 'hover:bg-dark-300'}`}>
            Weather
          </Link>
          <Link href="/crypto/bitcoin" className={`block py-2 px-3 rounded-md ${isActive('/crypto/bitcoin') === 'text-accent' ? 'bg-dark-300' : 'hover:bg-dark-300'}`}>
            Crypto
          </Link>
        </div>
      </div>
    </nav>
  );
}
