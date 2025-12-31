
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { SERVICES, FOUNDER_BIO, FOUNDER_NAME, COMPANY_PHONE } from './constants';
import { Property as PropertyType } from './types';
import { propertyService, authService } from './services/storage';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Star, MapPin, Bed, Bath, Square, 
  ShieldCheck, Briefcase, Award, TrendingUp, X, Filter, Search, 
  Play, MessageCircle, Plus, Trash2, Edit2, LogOut, Upload, User, LayoutDashboard, List
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
      
      {/* Infinite Marquee Container */}
      <div className="relative w-full">
        <div className="flex w-max animate-marquee hover:pause gap-8 px-4">
          {/* Duplicate data to create seamless loop */}
          {[...properties, ...properties, ...properties].map((p, idx) => (
            <div key={`${p.id}-${idx}`} className="w-[350px] md:w-[400px]">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
        
        {/* Gradients to fade edges */}
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

        {/* Filters */}
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
       {/* Image Gallery */}
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
          {/* Main Content */}
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
                   <div><span className="block font-bold">{property.bathrooms}</span><span className="text-xs text-gray-500">Bathrooms</span></div>
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

          {/* Sidebar */}
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
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await authService.login(email, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      alert('Invalid Credentials. Try propemperorrealestate@gmail.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-900/20 via-black to-black"></div>
      
      <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 shadow-2xl shadow-black">
        <div className="text-center mb-10">
           <h2 className="font-serif text-3xl font-bold text-white">Admin Portal</h2>
           <p className="text-gold-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">Restricted Access</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-4 bg-black border border-zinc-700 text-white focus:border-gold-500 outline-none"
              placeholder="propemperorrealestate@gmail.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 bg-black border border-zinc-700 text-white focus:border-gold-500 outline-none"
              placeholder="••••••••"
            />
          </div>
          <button className="w-full bg-gold-500 text-black font-bold py-4 uppercase tracking-widest hover:bg-white transition-all shadow-lg">
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [view, setView] = useState<'list' | 'add'>('list');
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', type: 'Sale', bedrooms: '', bathrooms: '', sqft: '', description: '', imageUrl: ''
  });

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

  const handleDelete = async (id: string) => {
    if(window.confirm('Delete this listing?')) {
      await propertyService.delete(id);
      loadData();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await propertyService.create({
      title: formData.title,
      price: parseInt(formData.price),
      priceDisplay: `₦${parseInt(formData.price).toLocaleString()}`,
      location: formData.location,
      type: formData.type as any,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      sqft: parseInt(formData.sqft),
      description: formData.description,
      images: [formData.imageUrl || 'https://via.placeholder.com/800'],
      features: ['Standard Feature'],
      status: 'Available',
      isFeatured: false
    });
    alert('Property Added');
    setView('list');
    loadData();
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-4">
       <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
             <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
             <div className="flex gap-4">
                <button onClick={() => setView('list')} className={`px-4 py-2 text-xs font-bold uppercase ${view === 'list' ? 'bg-gold-500 text-black' : 'bg-zinc-800'}`}>Manage</button>
                <button onClick={() => setView('add')} className={`px-4 py-2 text-xs font-bold uppercase ${view === 'add' ? 'bg-gold-500 text-black' : 'bg-zinc-800'}`}>Add New</button>
                <button onClick={() => { authService.logout(); navigate('/'); }} className="px-4 py-2 bg-red-900/50 text-red-500 text-xs font-bold uppercase border border-red-900">Logout</button>
             </div>
          </div>

          {view === 'list' ? (
             <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-zinc-950 text-gray-500 text-xs uppercase">
                      <tr>
                         <th className="p-4">Property</th>
                         <th className="p-4">Price</th>
                         <th className="p-4">Status</th>
                         <th className="p-4">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {properties.map(p => (
                         <tr key={p.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                            <td className="p-4 font-bold">{p.title}</td>
                            <td className="p-4 text-gold-500">{p.priceDisplay}</td>
                            <td className="p-4"><span className="bg-green-900 text-green-400 text-xs px-2 py-1">{p.status}</span></td>
                            <td className="p-4">
                               <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400"><Trash2 size={18}/></button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          ) : (
             <div className="bg-zinc-900 p-8 border border-zinc-800 max-w-3xl mx-auto">
                <h2 className="font-serif text-2xl mb-6">Add New Asset</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <input placeholder="Title" required className="bg-black border border-zinc-700 p-4 text-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                      <input placeholder="Location" required className="bg-black border border-zinc-700 p-4 text-white" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                   </div>
                   <div className="grid grid-cols-3 gap-6">
                      <input type="number" placeholder="Price (Numeric)" required className="bg-black border border-zinc-700 p-4 text-white" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                      <select className="bg-black border border-zinc-700 p-4 text-white" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                         <option>Sale</option><option>Rent</option><option>Short-Let</option>
                      </select>
                      <input placeholder="Image URL" required className="bg-black border border-zinc-700 p-4 text-white" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
                   </div>
                   <div className="grid grid-cols-3 gap-6">
                      <input type="number" placeholder="Beds" className="bg-black border border-zinc-700 p-4 text-white" value={formData.bedrooms} onChange={e => setFormData({...formData, bedrooms: e.target.value})} />
                      <input type="number" placeholder="Baths" className="bg-black border border-zinc-700 p-4 text-white" value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} />
                      <input type="number" placeholder="Sqft" className="bg-black border border-zinc-700 p-4 text-white" value={formData.sqft} onChange={e => setFormData({...formData, sqft: e.target.value})} />
                   </div>
                   <textarea placeholder="Description" className="w-full bg-black border border-zinc-700 p-4 text-white h-32" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                   <button className="w-full bg-gold-500 text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors">Create Listing</button>
                </form>
             </div>
          )}
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
        <Footer />
        <AIChat />
      </div>
    </Router>
  );
};

export default App;
