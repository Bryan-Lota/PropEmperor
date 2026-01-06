
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, ArrowRight, Lock } from 'lucide-react';
import { SOCIAL_LINKS, COMPANY_NAME, SERVICES } from '../constants';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-10 border-t border-gold-500/20 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-8">
            <h3 className="font-serif text-3xl font-bold text-white tracking-tight">PROP<span className="text-gold-500">EMPEROR</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              We provide the gold standard in Nigerian real estate. From acquisition to management, our services are divine, precise, and profitable.
            </p>
            <div className="flex space-x-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="bg-zinc-900 p-3 rounded-full hover:bg-gold-500 hover:text-black transition-all duration-300 hover:scale-110 border border-zinc-800">
                <Instagram size={18} />
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="bg-zinc-900 p-3 rounded-full hover:bg-gold-500 hover:text-black transition-all duration-300 hover:scale-110 border border-zinc-800">
                <Facebook size={18} />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="bg-zinc-900 p-3 rounded-full hover:bg-gold-500 hover:text-black transition-all duration-300 hover:scale-110 border border-zinc-800">
                <Twitter size={18} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="bg-zinc-900 p-3 rounded-full hover:bg-gold-500 hover:text-black transition-all duration-300 hover:scale-110 border border-zinc-800">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-white font-serif">Explore</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/about" className="hover:text-gold-400 hover:translate-x-1 transition-all flex items-center gap-2"><ArrowRight size={12} className="text-gold-500"/> About Us</Link></li>
              <li><Link to="/listings" className="hover:text-gold-400 hover:translate-x-1 transition-all flex items-center gap-2"><ArrowRight size={12} className="text-gold-500"/> Our Portfolio</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 hover:translate-x-1 transition-all flex items-center gap-2"><ArrowRight size={12} className="text-gold-500"/> Services</Link></li>
              <li><Link to="/policy" className="hover:text-gold-400 hover:translate-x-1 transition-all flex items-center gap-2"><ArrowRight size={12} className="text-gold-500"/> Policy</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 hover:translate-x-1 transition-all flex items-center gap-2"><ArrowRight size={12} className="text-gold-500"/> Contact</Link></li>
              <li><Link to="/admin" className="hover:text-gold-400 hover:translate-x-1 transition-all flex items-center gap-2 pt-4 opacity-50 hover:opacity-100 font-bold"><Lock size={12} className="text-gold-500"/> Admin Login</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-white font-serif">Key Services</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              {SERVICES.slice(0, 5).map(s => (
                <li key={s.id}><Link to="/services" className="hover:text-gold-400 transition-all">{s.title}</Link></li>
              ))}
              <li><Link to="/services" className="text-gold-500 text-xs uppercase font-bold tracking-widest mt-2 inline-block hover:underline">View All 16 Services</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg text-white font-serif">Headquarters</h4>
            <div className="space-y-4 text-gray-400 text-sm">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-gold-500 shrink-0" />
                <span>Independence Layout,<br/>Enugu State, Nigeria</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-gold-500 shrink-0" />
                <span>+2348133389856</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-gold-500 shrink-0" />
                <span>propemperorrealestate@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-xs">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-serif">Designed by Bryan.</p>
        </div>
      </div>
    </footer>
  );
};
