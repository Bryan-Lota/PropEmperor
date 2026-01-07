
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { SERVICES, FOUNDER_BIO, FOUNDER_NAME, COMPANY_PHONE, COMPANY_NAME } from './constants';
import { Property as PropertyType } from './types';
import { propertyService, authService } from './services/storage';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Star, MapPin, Bed, Bath, Square, 
  ShieldCheck, Briefcase, Award, TrendingUp, X, Filter, Search, 
  Play, MessageCircle, Plus, Trash2, Edit2, LogOut, Upload, User, LayoutDashboard, List,
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
      {/* Dynamic Background */}
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
      {/* Hero */}
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

      {/* Founder Section */}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                At PropEmperor, we redefine the very essence of dwelling. Established with a clear objective to provide the "Gold Standard" in the Nigerian real estate industry, {COMPANY_NAME} has grown from a local brokerage into a multi-faceted real estate powerhouse. We believe that every land transaction should be as regal and secure as the name implies.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
              </p>
              <p>
                Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.
              </p>
              <p>
                Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.
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

      {/* Corporate Philosophy */}
      <section className="py-24 bg-zinc-950 border-y border-zinc-900">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold mb-8 italic text-gold-500">The Emperor's Creed</h2>
            <div className="prose prose-invert prose-gold max-w-none text-gray-400 leading-loose italic">
              "Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum augue porta orci. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor."
            </div>
         </div>
      </section>

      {/* Core Values */}
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
          <div className="flex gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
             {['All', 'Sale', 'Rent', 'Short-Let'].map(type => (
               <button 
                 key={type}
                 onClick={() => setFilterType(type)}
                 className={`px-6 py-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${filterType === type ? 'bg-gold-500 text-black' : 'bg-black text-white border border-zinc-800 hover:border-gold-500'}`}
               >
                 {type}
               </button>
             ))}
          </div>
          <div className="relative w-full md:w-80">
             <input 
               type="text" 
               placeholder="Search location or title..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-black border border-zinc-700 text-white px-4 py-3 pl-10 focus:border-gold-500 outline-none"
             />
             <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
          </div>
        </div>

        {loading ? (
          <div className="text-white text-center py-20">Loading luxury assets...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
            {filtered.length === 0 && <p className="text-gray-500 text-center col-span-3">No properties match your criteria.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      if (id) {
        const data = await propertyService.getById(id);
        setProperty(data || null);
      }
    };
    fetch();
  }, [id]);

  if (!property) return <div className="pt-40 text-center text-white">Loading...</div>;

  return (
    <div className="pt-24 bg-black min-h-screen pb-20">
       <div className="h-[50vh] md:h-[70vh] relative group">
          <img 
            src={property.images[activeImage]} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent flex gap-2 overflow-x-auto justify-center">
             {property.images.map((img, idx) => (
               <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-20 border-2 ${activeImage === idx ? 'border-gold-500' : 'border-transparent'} opacity-80 hover:opacity-100 transition-all`}
               >
                 <img src={img} className="w-full h-full object-cover" />
               </button>
             ))}
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 text-white">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
                   <p className="text-gold-500 flex items-center gap-2"><MapPin size={18}/> {property.location}</p>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-bold text-white">{property.priceDisplay}</p>
                   <span className="bg-zinc-800 text-gray-300 text-xs px-2 py-1 uppercase">{property.status}</span>
                </div>
             </div>

             <div className="flex gap-8 border-y border-zinc-800 py-6 mb-8">
                <div className="flex items-center gap-3">
                   <Bed className="text-gold-500"/>
                   <div><span className="block font-bold">{property.bedrooms}</span><span className="text-xs text-gray-500">Bedrooms</span></div>
                </div>
                <div className="flex items-center gap-3">
                   <Bath className="text-gold-500"/>
                   <div><span className="block font-bold">{property.sqft}</span><span className="text-xs text-gray-500">Bathrooms</span></div>
                </div>
                <div className="flex items-center gap-3">
                   <Square className="text-gold-500"/>
                   <div><span className="block font-bold">{property.sqft}</span><span className="text-xs text-gray-500">Square Ft</span></div>
                </div>
             </div>

             <div className="mb-8">
               <h3 className="font-serif text-xl font-bold mb-4">Description</h3>
               <p className="text-gray-400 leading-relaxed whitespace-pre-line">{property.description}</p>
             </div>

             <div className="mb-8">
               <h3 className="font-serif text-xl font-bold mb-4">Features</h3>
               <div className="grid grid-cols-2 gap-4">
                  {property.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle size={16} className="text-gold-500" /> {f}
                    </div>
                  ))}
               </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className="bg-zinc-900 p-8 border border-zinc-800 sticky top-32">
                <h3 className="font-serif text-xl font-bold text-white mb-6">Interested?</h3>
                <WhatsAppButton propertyTitle={property.title} />
                <div className="mt-6 text-center text-gray-500 text-xs">
                   <p>Reference ID: {property.id}</p>
                   <p>Secure inquiry via WhatsApp Official</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};

const ServicesPage = () => {
  return (
    <div className="pt-32 pb-20 bg-black min-h-screen">
       <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h1 className="font-serif text-5xl text-white mb-4">Elite Services</h1>
             <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive real estate solutions delivered with military precision and royal excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {SERVICES.map((service, idx) => (
               <motion.div 
                 key={service.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: idx * 0.05 }}
                 className="bg-zinc-900/50 p-8 border border-zinc-800 hover:border-gold-500/50 hover:bg-zinc-900 transition-all group"
               >
                 <div className="w-12 h-12 bg-zinc-800 rounded-sm flex items-center justify-center mb-6 text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-colors">
                    <DynamicIcon name={service.iconName} />
                 </div>
                 <h3 className="font-serif text-xl font-bold text-white mb-3">{service.title}</h3>
                 <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
               </motion.div>
             ))}
          </div>
       </div>
    </div>
  );
};

// --- Admin Section ---

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await authService.login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Access Credentials. Please verify your details.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-900/10 via-black to-black"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-gold-500/20 p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="text-center mb-10">
           <div className="inline-block p-4 bg-gold-500/10 rounded-full mb-4">
              <ShieldCheck className="text-gold-500" size={40} />
           </div>
           <h2 className="font-serif text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
           <p className="text-gold-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-3">PropEmperor Management</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-red-900/20 border border-red-900/50 text-red-500 text-xs text-center font-bold uppercase tracking-widest">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Authenticated Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-4 bg-black/50 border border-zinc-800 text-white focus:border-gold-500 outline-none transition-colors"
              placeholder="admin@propemperor.com"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Access Key</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 bg-black/50 border border-zinc-800 text-white focus:border-gold-500 outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-gold-500 text-black font-bold py-5 uppercase text-xs tracking-[0.3em] hover:bg-white transition-all shadow-gold-glow">
            Establish Session
          </button>
        </form>
        <p className="mt-8 text-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Secure 256-bit Encrypted Portal</p>
      </motion.div>
    </div>
  );
};

const AdminDashboard = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const navigate = useNavigate();

  // Unified Form State
  const initialForm = {
    title: '', price: '', location: '', type: 'Sale', bedrooms: '0', bathrooms: '0', sqft: '0', description: '', imageUrl: '', status: 'Available'
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin');
      return;
    }
    loadData();
  }, []);

  const loadData = async () => {
    const data = await propertyService.getAll();
    setProperties(data);
  };

  const handleEdit = (p: PropertyType) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      price: p.price.toString(),
      location: p.location,
      type: p.type,
      bedrooms: p.bedrooms.toString(),
      bathrooms: p.bathrooms.toString(),
      sqft: p.sqft.toString(),
      description: p.description,
      imageUrl: p.images[0] || '',
      status: p.status
    });
    setView('editor');
  };

  const handleDelete = async (id: string) => {
    if(window.confirm('IRREVERSIBLE ACTION: Are you sure you want to permanently delete this asset listing?')) {
      await propertyService.delete(id);
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      price: parseInt(formData.price),
      priceDisplay: `₦${parseInt(formData.price).toLocaleString()}${formData.type === 'Rent' ? ' / yr' : ''}`,
      location: formData.location,
      type: formData.type as any,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      sqft: parseInt(formData.sqft),
      description: formData.description,
      images: [formData.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
      features: ['Standard Luxury Feature', 'Security Verified'],
      status: formData.status as any,
      isFeatured: false
    };

    if (editingId) {
      await propertyService.update(editingId, payload);
      alert('Asset Listing Updated Successfully.');
    } else {
      await propertyService.create(payload);
      alert('New Asset Listing Created Successfully.');
    }

    setView('list');
    setEditingId(null);
    setFormData(initialForm);
    loadData();
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4">
       <div className="max-w-7xl mx-auto">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
             <div className="bg-zinc-900 p-6 border-l-4 border-gold-500">
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">Total Assets</p>
                <h2 className="text-3xl font-serif font-bold">{properties.length}</h2>
             </div>
             <div className="bg-zinc-900 p-6 border-l-4 border-white/20">
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">Active Sales</p>
                <h2 className="text-3xl font-serif font-bold">{properties.filter(p => p.type === 'Sale').length}</h2>
             </div>
             <div className="bg-zinc-900 p-6 border-l-4 border-white/20">
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">Rentals</p>
                <h2 className="text-3xl font-serif font-bold">{properties.filter(p => p.type === 'Rent').length}</h2>
             </div>
             <div className="bg-zinc-900 p-6 border-l-4 border-white/20">
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">Short Lets</p>
                <h2 className="text-3xl font-serif font-bold">{properties.filter(p => p.type === 'Short-Let').length}</h2>
             </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
             <div>
                <h1 className="font-serif text-4xl font-bold tracking-tight">PropEmperor <span className="text-gold-500">Inventory</span></h1>
                <p className="text-zinc-500 text-xs mt-2 font-bold uppercase tracking-widest">Master Control Dashboard</p>
             </div>
             <div className="flex gap-4">
                <button 
                  onClick={() => { setView('list'); setEditingId(null); setFormData(initialForm); }} 
                  className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${view === 'list' ? 'bg-gold-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                >
                   <List size={16}/> Management
                </button>
                <button 
                  onClick={() => { setView('editor'); setEditingId(null); setFormData(initialForm); }} 
                  className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all ${view === 'editor' && !editingId ? 'bg-gold-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                >
                   <PlusCircle size={16}/> Add New Listing
                </button>
                <button 
                  onClick={() => { authService.logout(); navigate('/'); }} 
                  className="flex items-center gap-2 px-6 py-3 bg-red-900/10 text-red-500 border border-red-900/30 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                >
                   <LogOut size={16}/> Terminate Session
                </button>
             </div>
          </div>

          <AnimatePresence mode="wait">
            {view === 'list' ? (
               <motion.div 
                 key="list"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="bg-zinc-900/50 border border-zinc-800 rounded-sm overflow-hidden"
               >
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-black text-zinc-500 text-[10px] uppercase font-bold tracking-widest">
                          <tr>
                             <th className="p-6">Asset Title</th>
                             <th className="p-6">Price Point</th>
                             <th className="p-6">Category</th>
                             <th className="p-6">Current Status</th>
                             <th className="p-6 text-right">Administrative Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-zinc-800">
                          {properties.map(p => (
                             <tr key={p.id} className="hover:bg-gold-500/[0.02] transition-colors group">
                                <td className="p-6">
                                   <div className="flex items-center gap-4">
                                      <img src={p.images[0]} className="w-12 h-12 object-cover rounded-sm border border-zinc-800" />
                                      <div>
                                         <p className="font-bold text-white group-hover:text-gold-500 transition-colors">{p.title}</p>
                                         <p className="text-[10px] text-zinc-500 uppercase">{p.location}</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="p-6 font-serif text-gold-500 font-bold">{p.priceDisplay}</td>
                                <td className="p-6">
                                   <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-zinc-800 text-zinc-400 border border-zinc-700">
                                      {p.type}
                                   </span>
                                </td>
                                <td className="p-6">
                                   <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${
                                      p.status === 'Available' ? 'bg-green-900/20 text-green-400 border border-green-900/50' :
                                      p.status === 'Sold' ? 'bg-red-900/20 text-red-400 border border-red-900/50' : 
                                      'bg-orange-900/20 text-orange-400 border border-orange-900/50'
                                   }`}>
                                      {p.status}
                                   </span>
                                </td>
                                <td className="p-6 text-right">
                                   <div className="flex justify-end gap-3">
                                      <button 
                                        onClick={() => handleEdit(p)}
                                        className="p-2 text-zinc-400 hover:text-gold-500 hover:bg-gold-500/10 rounded-sm transition-all"
                                        title="Edit Listing"
                                      >
                                         <Edit2 size={18}/>
                                      </button>
                                      <button 
                                        onClick={() => handleDelete(p.id)}
                                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-all"
                                        title="Permanently Delete"
                                      >
                                         <Trash2 size={18}/>
                                      </button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                  </div>
                  {properties.length === 0 && (
                     <div className="py-32 text-center">
                        <p className="text-zinc-600 uppercase text-xs font-bold tracking-widest">No assets found in the Emperor's Database.</p>
                     </div>
                  )}
               </motion.div>
            ) : (
               <motion.div 
                 key="editor"
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.98 }}
                 className="bg-zinc-900/50 p-8 md:p-12 border border-zinc-800 max-w-5xl mx-auto"
               >
                  <div className="flex items-center gap-4 mb-10 border-b border-zinc-800 pb-8">
                     <div className="p-3 bg-gold-500/10 text-gold-500 rounded-sm">
                        {editingId ? <Edit2 size={24}/> : <PlusCircle size={24}/>}
                     </div>
                     <div>
                        <h2 className="font-serif text-3xl font-bold">{editingId ? 'Edit Asset Listing' : 'Declare New Asset'}</h2>
                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.3em] mt-1">{editingId ? `Listing ID: ${editingId}` : 'Create official entry'}</p>
                     </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                           <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Asset Title</label>
                              <input placeholder="e.g. Royal Emperor Estate" required className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-gold-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                           </div>
                           <div>
                              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Geographical Location</label>
                              <input placeholder="e.g. Independence Layout, Enugu" required className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-gold-500 outline-none" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                           </div>
                        </div>
                        <div className="space-y-6">
                           <div className="grid grid-cols-2 gap-6">
                              <div>
                                 <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Market Valuation (Numeric)</label>
                                 <input type="number" placeholder="150000000" required className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-gold-500 outline-none" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                              </div>
                              <div>
                                 <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Listing Category</label>
                                 <select className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-gold-500 outline-none appearance-none cursor-pointer" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                    <option>Sale</option>
                                    <option>Rent</option>
                                    <option>Short-Let</option>
                                    <option>Lease</option>
                                 </select>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-6">
                              <div>
                                 <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Inventory Status</label>
                                 <select className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-gold-500 outline-none appearance-none cursor-pointer" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                                    <option>Available</option>
                                    <option>Sold</option>
                                    <option>Pending</option>
                                 </select>
                              </div>
                              <div>
                                 <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Primary Visual (URL)</label>
                                 <input placeholder="https://..." required className="w-full bg-black border border-zinc-800 p-4 text-white focus:border-gold-500 outline-none" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="grid grid-cols-3 gap-8 pt-6 border-t border-zinc-800">
                        <div>
                           <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 text-center">Sleep Chambers (Beds)</label>
                           <input type="number" className="w-full bg-black border border-zinc-800 p-4 text-white text-center focus:border-gold-500 outline-none" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} />
                        </div>
                        <div>
                           <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 text-center">Luxury Baths</label>
                           <input type="number" className="w-full bg-black border border-zinc-800 p-4 text-white text-center focus:border-gold-500 outline-none" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} />
                        </div>
                        <div>
                           <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3 text-center">Total Footprint (Sqft)</label>
                           <input type="number" className="w-full bg-black border border-zinc-800 p-4 text-white text-center focus:border-gold-500 outline-none" value={formData.sqft} onChange={e => setFormData({...formData, sqft: e.target.value})} />
                        </div>
                     </div>

                     <div className="pt-6 border-t border-zinc-800">
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">Detailed Asset Description & Narrative</label>
                        <textarea 
                           placeholder="Describe the royal essence and features of this property..." 
                           required 
                           className="w-full bg-black border border-zinc-800 p-6 text-white h-56 focus:border-gold-500 outline-none leading-relaxed resize-none" 
                           value={formData.description} 
                           onChange={e => setFormData({...formData, description: e.target.value})}
                        ></textarea>
                     </div>

                     <div className="flex gap-6">
                        <button type="submit" className="flex-1 bg-gold-500 text-black py-5 font-bold uppercase text-xs tracking-[0.4em] hover:bg-white transition-all shadow-gold-glow flex items-center justify-center gap-2">
                           {editingId ? <><Save size={18}/> Commit Updates</> : <><Plus size={18}/> Publish Listing</>}
                        </button>
                        <button 
                           type="button" 
                           onClick={() => { setView('list'); setEditingId(null); setFormData(initialForm); }}
                           className="px-10 py-5 bg-zinc-800 text-zinc-400 font-bold uppercase text-xs tracking-[0.4em] hover:bg-zinc-700 hover:text-white transition-all"
                        >
                           Cancel
                        </button>
                     </div>
                  </form>
               </motion.div>
            )}
          </AnimatePresence>
       </div>
    </div>
  );
};

// --- Main App ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-black text-white font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
               <>
                 <HeroSection />
                 <div className="py-20 bg-black">
                   <div className="max-w-7xl mx-auto px-4"><ServicesPage /></div>
                   <FeaturedPropertiesMarquee />
                 </div>
               </>
            } />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/property/:id" element={<PropertyDetailsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={
               <div className="pt-32 pb-20 text-center text-white min-h-screen">
                  <h1 className="text-4xl font-serif mb-4">Contact Us</h1>
                  <p className="mb-8">Visit our HQ or send us a message.</p>
                  <WhatsAppButton propertyTitle="General Inquiry" />
               </div>
            } />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <AIChat />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
