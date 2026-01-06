
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Listings', path: '/listings' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        scrolled || isOpen
          ? 'bg-black/95 backdrop-blur-xl py-4 border-gold-500/20 shadow-lg shadow-gold-500/5' 
          : 'bg-transparent py-8 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
                <Building2 className="text-gold-500 h-10 w-10 relative z-10 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl text-white tracking-wide group-hover:text-gold-100 transition-colors">
                PROP<span className="text-gold-500 group-hover:text-white transition-colors">EMPEROR</span>
              </span>
              <span className="text-[0.6rem] tracking-[0.4em] text-gold-400 uppercase font-sans">Real Estate</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-bold tracking-widest uppercase hover:text-gold-400 transition-all relative group py-2 ${
                  location.pathname === link.path ? 'text-gold-500' : 'text-gray-300'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent transition-all duration-500 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            ))}
            
            {/* Admin Access Button */}
            <Link 
              to="/admin" 
              className="flex items-center gap-2 bg-gold-500/10 hover:bg-gold-500 text-gold-500 hover:text-black border border-gold-500/30 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm"
            >
              <User size={14} /> Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gold-500 hover:text-white transition-colors relative z-50"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-zinc-900 border-b border-gold-500/20 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block text-lg font-serif font-bold tracking-widest uppercase border-l-2 pl-4 transition-all ${
                     location.pathname === link.path 
                     ? 'border-gold-500 text-gold-500 bg-black/20' 
                     : 'border-transparent text-gray-300 hover:text-white hover:border-gray-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                className="block text-lg font-serif font-bold tracking-widest uppercase border-l-2 pl-4 border-gold-500/50 text-gold-500"
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
