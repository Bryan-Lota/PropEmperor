import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SERVICES, FOUNDER_BIO, FOUNDER_NAME, COMPANY_PHONE, COMPANY_NAME } from './constants';
import { Property as PropertyType } from './types';
import { propertyService, authService } from './services/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, MapPin, Bed, Bath, Square, 
  ShieldCheck, Award, TrendingUp, Search, 
  MessageCircle, Plus, Trash2, Edit2, LogOut, List,
  Shield, Scale, FileCheck, Landmark, PlusCircle, Save
} from 'lucide-react';
import * as Icons from 'lucide-react';

// --- Utility Components ---

const DynamicIcon = ({ name, size = 24, className = "" }: { name: string, size?: number, className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent size={size} className={className} />;
};

const WhatsAppButton = ({ propertyTitle }: { propertyTitle: string }) => {
  const message = `Hello, I am interested in ${propertyTitle}. Is it still available?`;
  const url = `https://wa.me/${COMPANY_PHONE}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-sm font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-[#25D366]/40"
    >
      <MessageCircle size={20} /> Chat on WhatsApp
    </a>
  );
};

// --- Sections & Pages ---

const HeroSection = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
         <motion.div 
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
           className="w-full h-full bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-20 bg-gold-500"></div>
            <span className="text-gold-400 font-bold tracking-[0.4em] uppercase text-sm animate-pulse">
              Enugu's Premier Estate Firm
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] drop-shadow-2xl">
            Acquire The <br/>
            <span className="text-transparent bg-clip-text bg-gold-gradient animate-shine bg-[length:200%_auto]">
              Impossible
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed max-w-xl font-light border-l-2 border-gold-500 pl-6">
            We specialize in high-value assets, secure documentation, and profitable real estate investments across Nigeria.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <a href="/#/listings" className="px-10 py-5 bg-gold-500 text-black font-bold text-sm tracking-widest uppercase hover:bg-white transition-all shadow-gold-glow">
              View Portfolio
            </a>
            <a href="/#/services" className="px-10 py-5 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:border-gold-500 hover:text-gold-500 transition-colors backdrop-blur-sm">
              Our Services
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PropertyCard: React.FC<{ property: PropertyType }> = ({ property }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-zinc-900 border border-zinc-800 hover:border-gold-500/50 transition-all duration-500 overflow-hidden relative shrink-0 w-full"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
        <div className="absolute top-4 right-4 bg-gold-500 text-black px-3 py-1 text-xs font-bold uppercase">
          {property.type}
        </div>
        <div className="absolute bottom-4 left-4">
           <p className="text-gold-400 font-bold text-xl">{property.priceDisplay}</p>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-serif text-xl font-bold text-white mb-2 truncate">{property.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex items-center gap-2"><MapPin size={14}/> {property.location}</p>
        
        <div className="grid grid-cols-3 gap-2 border-t border-zinc-800 pt-4 mb-6">
           <div className="text-center">
             <span className="block text-white font-bold">{property.bedrooms}</span>
             <span className="text-[10px] text-gray-500 uppercase">Beds</span>
           </div>
           <div className="text-center border-l border-zinc-800">
             <span className="block text-white font-bold">{property.bathrooms}</span>
             <span className="text-[10px] text-gray-500 uppercase">Baths</span>
           </div>
           <div className="text-center border-l border-zinc-800">
             <span className="block text-white font-bold">{property.sqft}</span>
             <span className="text-[10px] text-gray-500 uppercase">Sqft</span>
           </div>
        </div>
        
        <a href={`/#/property/${property.id}`} className="block w-full py-3 text-center border border-zinc-700 text-white text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all">
          View Details
        </a>
      </div>
    </motion.div>
  );
};

const FeaturedPropertiesMarquee = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await propertyService.getAll();
      setProperties(data);
    };
    fetch();
  }, []);

  if (properties.length === 0) return null;

  return (
    <div className="py-24 bg-black overflow-hidden border-t border-zinc-900">
      <div className="mb-12 text-center max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          <span className="text-gold-500">Exclusive</span> Listings
        </h2>
        <div className="h-0.5 w-20 bg-gold-500 mx-auto opacity-50"></div>
      </div>
      
      <div className="relative w-full">
        <div className="flex w-max animate-marquee hover:pause gap-8 px-4">
          {[...properties, ...properties, ...properties].map((p, idx) => (
            <div key={`${p.id}-${idx}`} className="w-[350px] md:w-[400px]">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
      </div>

      <div className="text-center mt-12">
         <a href="/#/listings" className="inline-flex items-center gap-2 text-gold-500 uppercase text-xs font-bold tracking-widest hover:text-white transition-colors">
           View All Properties <ArrowRight size={16}/>
         </a>
      </div>
    </div>
  );
};

// --- Pages ---

const AboutUsPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="h-[60vh] relative flex items-center justify-center overflow-hidden">
         <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Corporate Architecture" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black"></div>
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative z-10 text-center px-4"
         >
           <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 italic">About Us</h1>
           <p className="text-gold-500 uppercase tracking-[0.5em] text-sm font-bold">The Legacy of Excellence</p>
           <div className="h-1 w-32 bg-gold-500 mx-auto mt-6"></div>
         </motion.div>
      </div>

      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
         <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="relative"
         >
           <div className="absolute -inset-4 border border-gold-500/30 -z-10 translate-x-8 translate-y-8"></div>
           <img 
             src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
             alt={FOUNDER_NAME} 
             className="w-full h-[700px] object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl border border-zinc-800"
           />
           <div className="absolute bottom-8 left-8 bg-black/90 backdrop-blur-md border border-gold-500/50 text-white p-8">
              <h3 className="font-serif text-3xl font-bold text-gold-500">{FOUNDER_NAME}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-2">Founder, Visionary & CEO</p>
           </div>
         </motion.div>
         
         <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="space-y-8"
         >
           <div>
             <span className="text-gold-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Philosophy</span>
             <h2 className="font-serif text-4xl font-bold mb-6">A Vision Of Unrivaled Luxury</h2>
             <p className="text-white text-lg leading-relaxed font-medium italic border-l-4 border-gold-500 pl-6 mb-8">
               {FOUNDER_BIO}
             </p>
           </div>

           <div className="prose prose-invert prose-gold max-w-none text-gray-400 leading-relaxed space-y-6">
             <p>
               At PropEmperor, we redefine the very essence of dwelling. Established with a clear objective to provide the "Gold Standard" in the Nigerian real estate industry, {COMPANY_NAME} has grown from a local brokerage into a multi-faceted real estate powerhouse. We believe that every land transaction should be as regal and secure as the name implies.
             </p>
             <p>
               We are committed to delivering excellence in every aspect of our service. From property valuation to legal documentation, our team ensures that every step of your real estate journey is seamless and transparent.
             </p>
           </div>
           
           <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
              <div>
                 <h4 className="text-gold-500 font-serif text-4xl font-bold mb-2">150+</h4>
                 <p className="text-xs uppercase text-gray-500 font-bold tracking-widest">Properties Sold</p>
              </div>
              <div>
                 <h4 className="text-gold-500 font-serif text-4xl font-bold mb-2">500+</h4>
                 <p className="text-xs uppercase text-gray-500 font-bold tracking-widest">Happy Clients</p>
              </div>
           </div>
         </motion.div>
      </section>

      <section className="py-24 bg-zinc-950 border-y border-zinc-900">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold mb-8 italic text-gold-500">The Emperor's Creed</h2>
            <div className="prose prose-invert prose-gold max-w-none text-gray-400 leading-loose italic">
              "We pledge to uphold the highest standards of integrity, transparency, and excellence in every transaction. Our clients' trust is our most valuable asset, and we guard it with the same vigilance as we do their investments."
            </div>
         </div>
      </section>

      <section className="py-24">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="font-serif text-3xl font-bold mb-4 uppercase tracking-widest">Our Core Values</h2>
               <div className="h-0.5 w-20 bg-gold-500 mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: 'Integrity', icon: Shield, desc: 'Every document we handle is verified and legal, ensuring your absolute peace of mind. We stand by our word.' },
                 { title: 'Excellence', icon: Award, desc: 'We don\'t just find houses; we find legacies. Quality is non-negotiable in every brick and document.' },
                 { title: 'Innovation', icon: TrendingUp, desc: 'Utilizing modern technology and AI to streamline the Nigerian property market for global accessibility.' }
               ].map((val, i) => (
                 <div key={i} className="text-center p-12 border border-zinc-900 bg-zinc-900/30 hover:border-gold-500/50 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <val.icon className="mx-auto mb-6 text-gold-500 group-hover:scale-110 transition-transform" size={48} strokeWidth={1}/>
                    <h3 className="font-serif text-xl font-bold mb-4">{val.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

const PolicyPage = () => {
  const policies = [
    {
      title: "Privacy & Data Protection",
      icon: Shield,
      content: "At PropEmperor, your personal data is handled with imperial security. We collect your information solely for property matching and legal documentation. We never share your data with third parties without your explicit consent."
    },
    {
      title: "Transaction Security",
      icon: Landmark,
      content: "All financial transactions are conducted through secure, regulated banking channels. We advise all clients to verify payment instructions via our official office lines or in-person at our Independence Layout headquarters."
    },
    {
      title: "Property Viewing Policy",
      icon: Search,
      content: "Site inspections are arranged 24-48 hours in advance. For security reasons, all prospective clients must provide basic identification before viewing premium or occupied luxury assets."
    },
    {
      title: "Verification & Documentation",
      icon: FileCheck,
      content: "PropEmperor guarantees that all listings passed through our agency undergo a rigorous 3-step verification process, including title search and surveyor validation, to prevent land disputes."
    },
    {
      title: "Service Fees & Commissions",
      icon: Scale,
      content: "Our agency fees follow standard Nigerian Real Estate Association guidelines. All professional fees are disclosed upfront during initial consulting sessions to maintain absolute transparency."
    }
  ];

  return (
    <div className="pt-40 pb-24 bg-black min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Policy</h1>
          <p className="text-gold-500 uppercase text-xs font-bold tracking-[0.4em]">Standards of Excellence</p>
        </div>

        <div className="space-y-8">
          {policies.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm hover:border-gold-500/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gold-500/10 p-3 rounded-sm">
                  <p.icon className="text-gold-500" size={24} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">{p.title}</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {p.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gold-500/5 border border-gold-500/20 p-8 text-center rounded-sm">
           <p className="text-gray-300 text-sm mb-4 italic">
             "PropEmperor Real Estate operates under the legal framework of the Corporate Affairs Commission (CAC) and Nigerian Real Estate Regulatory Laws."
           </p>
           <p className="text-gold-500 font-bold text-xs uppercase tracking-widest">Effective Date: January 1, 2024</p>
        </div>
      </div>
    </div>
  );
};

const ListingsPage = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const data = await propertyService.getAll();
      setProperties(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = properties.filter(p => {
    const matchesType = filterType === 'All' || p.type === filterType;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 bg-black min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Our Portfolio</h1>
          <div className="h-1 w-20 bg-gold-500 mx-auto"></div>
        </div>

        <div className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center bg-zinc-900 p-6 rounded-sm border border-zinc-800">
          <div className="flex gap-4 overflow-x-auto w-full md
