
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { CARS, DEFAULT_CATEGORIES, DEFAULT_SITE_CONTENT, DEFAULT_EVENTS } from './constants';
import { Car, SiteContent, HeroSlide, Event as RmcEvent } from './types';
import Concierge from './components/Concierge';
import ComparisonChart from './components/ComparisonChart';
import { 
  Menu, X, ArrowRight, Check, Gauge, MapPin, Phone, 
  Clock, Globe, Lock, LayoutDashboard, LogOut, Plus, 
  Trash2, Edit, Save, Image as ImageIcon, Layers, 
  FileText, Upload, Instagram, Facebook, Youtube, 
  MonitorPlay, Ticket, Eye, EyeOff, ShieldCheck, 
  Wrench, Trophy, Loader2, AlertCircle, Sparkles, Shield
} from 'lucide-react';

// --- Types for Data Service ---
type AppData = {
  inventory: Car[];
  categories: string[];
  siteContent: SiteContent;
  events: RmcEvent[];
};

// --- Brand Components ---

const BrandLogo = ({ className = "h-10", theme = 'light' }: { className?: string, theme?: 'dark' | 'light' }) => (
  <div className="flex items-center gap-3 select-none">
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5L85 85L50 70L15 85L50 5Z" fill="#b4914b" />
      <path d="M50 78L50 95" stroke="#b4914b" strokeWidth="4" strokeLinecap="round" />
    </svg>
    <div className={`flex flex-col items-start justify-center leading-none ${theme === 'dark' ? 'text-slate-900' : 'text-white'}`}>
       <span className="font-display font-bold text-2xl tracking-tight uppercase">Rocket</span>
       <div className="flex flex-col -mt-1">
         <span className="font-display font-bold text-[10px] tracking-[0.15em] uppercase text-rocket-500">Motor</span>
         <span className="font-display font-bold text-[10px] tracking-[0.15em] uppercase -mt-0.5 text-rocket-500">Company</span>
       </div>
    </div>
  </div>
);

const TiktokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// --- Content Components ---

const Navbar = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <BrandLogo className="h-12 w-12" theme="light" />
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            {['home', 'showroom', 'service', 'events', 'compare'].map((page) => (
              <button 
                key={page}
                onClick={() => onNavigate(page)} 
                className="text-slate-300 hover:text-rocket-500 transition-colors text-sm font-bold uppercase tracking-wider"
              >
                {page === 'home' ? 'Home' : page === 'showroom' ? 'The Collection' : page}
              </button>
            ))}
            <button className="bg-rocket-500 text-slate-950 px-6 py-2 font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors transform skew-x-[-10deg]">
              <span className="transform skew-x-[10deg] inline-block">Inquire</span>
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-4 space-y-1">
             {['home', 'showroom', 'service', 'events', 'compare'].map(page => (
               <button 
                key={page}
                onClick={() => { onNavigate(page); setMobileMenuOpen(false); }} 
                className="block w-full text-left py-4 text-base font-bold text-slate-300 border-b border-slate-800 font-display uppercase"
               >
                 {page}
               </button>
             ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onShopNow, content, inventory }: { onShopNow: () => void, content: SiteContent['hero'], inventory: Car[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(() => {
    if (content.slides && content.slides.length > 0) return content.slides;
    return inventory.slice(0, 5).map(c => ({
      id: c.id,
      image: c.images[0],
      title: `${c.year} ${c.make} ${c.model}`,
      subtitle: 'Featured Collection'
    }));
  }, [content.slides, inventory]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="relative h-[80vh] min-h-[600px] overflow-hidden bg-slate-950">
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105 animate-slow-zoom" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 to-transparent" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start z-10">
        <span className="text-rocket-500 font-bold tracking-[0.4em] text-sm mb-4 uppercase animate-fade-in">{content.estYear}</span>
        <h1 className="text-6xl md:text-8xl text-white font-display font-bold leading-none mb-6 uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: content.title.replace('.', '<span class="text-rocket-500">.</span>') }} />
        <p className="text-xl text-slate-400 max-w-xl mb-10 font-light leading-relaxed border-l-4 border-rocket-500 pl-6">{content.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={onShopNow} className="px-10 py-4 bg-rocket-500 text-slate-950 font-display font-bold uppercase tracking-wider hover:bg-white transition-all shadow-xl shadow-rocket-900/20 flex items-center justify-center gap-2">
            View Inventory <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 right-4 md:right-8 flex gap-2">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1 transition-all duration-300 ${idx === currentSlide ? 'w-12 bg-rocket-500' : 'w-4 bg-slate-700'}`} />
        ))}
      </div>
    </div>
  );
};

const CarCard: React.FC<{ car: Car; onClick: () => void }> = ({ car, onClick }) => (
  <div onClick={onClick} className="group bg-slate-900 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-800 hover:border-rocket-500/50">
    <div className="relative h-64 overflow-hidden">
      <img src={car.images[0]} alt={car.model} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
      <div className="absolute top-4 left-4">
        <span className="bg-rocket-500 text-slate-950 text-[10px] font-bold px-3 py-1 uppercase tracking-widest">{car.type}</span>
      </div>
    </div>
    <div className="p-6">
      <p className="text-rocket-500 text-xs font-bold uppercase tracking-widest mb-1">{car.year} {car.make}</p>
      <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase">{car.model}</h3>
      <div className="flex items-center gap-2 text-slate-400 text-sm border-t border-slate-800 pt-4 font-medium">
        <Gauge className="w-4 h-4 text-rocket-500" /> {car.specs.mileage.toLocaleString()} miles
      </div>
    </div>
  </div>
);

const EventCard: React.FC<{ event: RmcEvent }> = ({ event }) => (
  <div className="group relative bg-slate-950 border border-slate-800 overflow-hidden shadow-xl hover:border-rocket-500 transition-all duration-500">
    <div className="h-56 overflow-hidden relative">
      <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0" />
      <div className="absolute top-4 right-4 bg-rocket-500 text-slate-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg transform skew-x-[-15deg]">
        <span className="transform skew-x-[15deg] block">{event.date}</span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-2 text-rocket-500 text-[10px] font-bold uppercase tracking-widest mb-3">
        <MapPin className="w-3 h-3" /> {event.location}
      </div>
      <h3 className="text-xl font-display font-bold text-white uppercase mb-3 leading-tight">{event.title}</h3>
      <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 line-clamp-2">{event.description}</p>
      <button className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest hover:text-rocket-500 transition-colors">
        Register Interest <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  </div>
);

// --- Admin Sub-Sections ---

const VehicleAdmin = ({ 
  cars, categories, onEdit, onDelete, onCreate 
}: { 
  cars: Car[], categories: string[], onEdit: (c: Car) => void, onDelete: (id: string) => void, onCreate: () => void 
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-display font-bold text-white uppercase">Inventory Manager</h2>
      <button onClick={onCreate} className="bg-rocket-500 text-slate-950 px-6 py-2 font-bold uppercase text-xs flex items-center gap-2 hover:bg-white transition-all">
        <Plus className="w-4 h-4" /> New Vehicle
      </button>
    </div>
    <div className="bg-slate-900 border border-slate-800 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-widest">
            <th className="p-4">Vehicle</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {cars.map(car => (
            <tr key={car.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 flex items-center gap-4">
                <img src={car.images[0]} className="w-12 h-10 object-cover" />
                <div>
                  <p className="text-white font-bold">{car.year} {car.make}</p>
                  <p className="text-slate-500 text-xs">{car.model}</p>
                </div>
              </td>
              <td className="p-4 text-slate-400">{car.type}</td>
              <td className="p-4 text-white font-display">${car.price.toLocaleString()}</td>
              <td className="p-4 text-right space-x-2">
                <button onClick={() => onEdit(car)} className="p-2 text-slate-500 hover:text-rocket-500"><Edit className="w-4 h-4" /></button>
                <button onClick={() => onDelete(car.id)} className="p-2 text-slate-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main Application ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'showroom' | 'compare' | 'admin' | 'events' | 'service'>('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // --- Persistent State ---
  const [data, setData] = useState<AppData>({
    inventory: CARS,
    categories: DEFAULT_CATEGORIES,
    siteContent: DEFAULT_SITE_CONTENT,
    events: DEFAULT_EVENTS
  });

  // --- Server Synchronization Logic ---
  const fetchFromServer = useCallback(async () => {
    setLoading(true);
    try {
      const saved = localStorage.getItem('rocket_persistence_v1');
      if (saved) {
        setData(JSON.parse(saved));
      }
      await new Promise(r => setTimeout(r, 800));
    } catch (err) {
      setError("Failed to synchronize with server. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, []);

  const syncToServer = useCallback(async (updatedData: AppData) => {
    setSaving(true);
    try {
      localStorage.setItem('rocket_persistence_v1', JSON.stringify(updatedData));
      setData(updatedData);
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      alert("Error saving changes to server.");
    } finally {
      setSaving(false);
    }
  }, []);

  useEffect(() => {
    fetchFromServer();
  }, [fetchFromServer]);

  // --- UI States ---
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [adminCreds, setAdminCreds] = useState({ user: '', pass: '' });
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filterType, setFilterType] = useState<string>('All');
  const [compareCars, setCompareCars] = useState<{ c1: Car | null, c2: Car | null }>({ c1: null, c2: null });

  const filteredCars = useMemo(() => {
    if (filterType === 'All') return data.inventory;
    return data.inventory.filter(c => c.type === filterType);
  }, [filterType, data.inventory]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Admin Logic ---
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Two sets of authorized admin credentials
    const admins = [
      { user: 'admin', pass: 'rocket2024' },
      { user: 'specialist', pass: 'rocket_power' }
    ];

    const isAuthenticated = admins.some(
      acc => acc.user === adminCreds.user && acc.pass === adminCreds.pass
    );

    if (isAuthenticated) {
      setIsAdminAuthenticated(true);
    } else {
      alert("Invalid Clearance Level. Authorization Denied.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-rocket-500 animate-spin mb-4" />
        <p className="text-slate-500 font-display uppercase tracking-[0.3em] animate-pulse">Initializing Systems...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-display text-white uppercase mb-2">Sync Error</h2>
        <p className="text-slate-400 mb-8">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-rocket-500 text-slate-950 px-8 py-3 font-bold uppercase">Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-rocket-500 selection:text-slate-950">
      <Navbar onNavigate={handleNavigate} />
      
      <main className="animate-in fade-in duration-700">
        {currentPage === 'home' && (
          <>
            <Hero onShopNow={() => handleNavigate('showroom')} content={data.siteContent.hero} inventory={data.inventory} />
            
            {/* Arrivals */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800 pb-8">
                <div>
                  <h2 className="text-4xl font-display font-bold text-white mb-2 uppercase tracking-tight">Latest Arrivals</h2>
                  <p className="text-slate-400 font-light">Hand-picked classics added this month</p>
                </div>
                <button onClick={() => handleNavigate('showroom')} className="text-rocket-500 hover:text-white font-bold uppercase tracking-wider flex items-center gap-2 text-sm group">
                  View Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {data.inventory.slice(0, 3).map(car => (
                  <CarCard key={car.id} car={car} onClick={() => setSelectedCar(car)} />
                ))}
              </div>
            </section>

            {/* Credibility */}
            <section className="py-24 bg-slate-900/50 border-y border-slate-800">
               <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                  {[
                    { icon: ShieldCheck, title: "Verified Provenance", desc: "Every vehicle comes with fully documented history and inspection reports." },
                    { icon: Wrench, title: "Master Restoration", desc: "In-house mechanics ensure every classic is mechanically superior." },
                    { icon: Trophy, title: "Curated Excellence", desc: "We only source vehicles that represent the pinnacle of their class." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-4">
                      <div className="w-16 h-16 bg-slate-800 text-rocket-500 flex items-center justify-center mx-auto rounded-full border border-slate-700 shadow-xl">
                        <item.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-white uppercase">{item.title}</h3>
                      <p className="text-slate-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </section>

            {/* Events Preview */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
               <div className="text-center mb-16">
                  <span className="text-rocket-500 text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">Community</span>
                  <h2 className="text-4xl font-display font-bold text-white uppercase tracking-tight">The Social Circuit</h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {data.events.slice(0, 2).map(ev => <EventCard key={ev.id} event={ev} />)}
               </div>
            </section>
          </>
        )}

        {currentPage === 'showroom' && (
          <div className="py-20 px-4 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-5xl font-display font-bold text-center uppercase mb-12">The Collection</h1>
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {['All', ...data.categories].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setFilterType(cat)}
                  className={`px-6 py-2 border-2 text-xs font-bold uppercase transition-all tracking-widest ${filterType === cat ? 'bg-white text-slate-950 border-white' : 'text-slate-500 border-slate-800 hover:border-rocket-500'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredCars.map(car => <CarCard key={car.id} car={car} onClick={() => setSelectedCar(car)} />)}
            </div>
          </div>
        )}

        {currentPage === 'service' && (
          <div className="py-20 px-4 max-w-7xl mx-auto min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-20">
              <span className="text-rocket-500 text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">Maintenance & Care</span>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white uppercase tracking-tight mb-6">Expert Services</h1>
              <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">Whether it's a concourse-level detail or specialized maintenance for your vintage machine, our specialists treat every vehicle as a piece of history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Rocket Detailing Studio */}
              <div className="group relative bg-slate-900 border border-slate-800 overflow-hidden rounded-sm hover:border-rocket-500 transition-all duration-500">
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1601362840469-51e4d8d59085?q=80&w=2070&auto=format&fit=crop" 
                    alt="Detailing Service" 
                    className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-rocket-500 text-slate-950 p-3 rounded-full shadow-lg">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="p-10 -mt-20 relative z-10 bg-slate-900/90 backdrop-blur-md mx-6 mb-6 border border-slate-800 shadow-2xl">
                  <h3 className="text-3xl font-display font-bold text-white uppercase mb-4">Rocket Detailing Studio</h3>
                  <p className="text-slate-400 font-light mb-8 leading-relaxed">
                    Elevate your vehicle's presence. Our studio specializes in high-end paint correction, ceramic coatings, and interior restorations using the finest tools and products.
                  </p>
                  <a 
                    href="https://www.instagram.com/rocketmotorstudio/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-3 bg-rocket-500 text-slate-950 px-8 py-4 font-display font-bold uppercase tracking-wider hover:bg-white transition-all transform hover:translate-x-1"
                  >
                    <Instagram className="w-5 h-5" /> Visit Detailing Studio
                  </a>
                </div>
              </div>

              {/* Maintenance Program */}
              <div className="group relative bg-slate-900 border border-slate-800 overflow-hidden rounded-sm hover:border-rocket-500 transition-all duration-500">
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop" 
                    alt="Maintenance Service" 
                    className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6">
                    <div className="bg-rocket-500 text-slate-950 p-3 rounded-full shadow-lg">
                      <Shield className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div className="p-10 -mt-20 relative z-10 bg-slate-900/90 backdrop-blur-md mx-6 mb-6 border border-slate-800 shadow-2xl">
                  <h3 className="text-3xl font-display font-bold text-white uppercase mb-4">Exclusive Care Plan</h3>
                  <div className="bg-rocket-500/10 border border-rocket-500/20 p-4 mb-6 inline-block">
                    <p className="text-rocket-500 font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                       1 Year Free Service Included
                    </p>
                  </div>
                  <p className="text-slate-400 font-light mb-8 leading-relaxed">
                    Peace of mind comes standard. All our buyers and exclusive members receive one full year of complimentary scheduled maintenance and priority shop access.
                  </p>
                  <button onClick={() => handleNavigate('showroom')} className="inline-flex items-center gap-3 border-2 border-slate-700 text-white px-8 py-4 font-display font-bold uppercase tracking-wider hover:border-rocket-500 hover:text-rocket-500 transition-all">
                    Explore Inventory <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Service Features Row */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-slate-800 pt-16">
              {[
                { title: "Oil & Fluids", desc: "Premium synthetic blends for classic and modern engines." },
                { title: "Brake Systems", desc: "Complete overhaul and performance upgrades." },
                { title: "Suspension", desc: "Restoring the original ride or modernizing for the track." },
                { title: "Electrical", desc: "Expert troubleshooting for vintage wiring looms." }
              ].map((f, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-rocket-500 font-display font-bold uppercase">{f.title}</h4>
                  <p className="text-slate-500 text-sm font-light">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'events' && (
          <div className="py-20 px-4 max-w-7xl mx-auto min-h-screen">
            <h1 className="text-5xl font-display font-bold text-center uppercase mb-4 tracking-tight">Shop Gatherings</h1>
            <p className="text-slate-400 text-center mb-16 max-w-xl mx-auto font-light">Join the Rocket Motor Company community at these upcoming gatherings, rallies, and meets.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {data.events.map(ev => <EventCard key={ev.id} event={ev} />)}
            </div>
          </div>
        )}

        {currentPage === 'compare' && (
          <div className="py-20 px-4 max-w-7xl mx-auto min-h-screen">
             <h1 className="text-5xl font-display font-bold text-center uppercase mb-16">Head to Head</h1>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                <div className="bg-slate-900 p-8 border border-slate-800">
                  <select 
                    className="w-full bg-slate-800 text-white p-4 uppercase font-bold text-xs outline-none border border-slate-700"
                    onChange={e => setCompareCars(prev => ({ ...prev, c1: data.inventory.find(c => c.id === e.target.value) || null }))}
                  >
                    <option value="">Vehicle 1...</option>
                    {data.inventory.map(c => <option key={c.id} value={c.id}>{c.year} {c.make} {c.model}</option>)}
                  </select>
                  {compareCars.c1 && <img src={compareCars.c1.images[0]} className="w-full h-64 object-cover mt-8 grayscale hover:grayscale-0 transition-all" />}
                </div>
                <div className="bg-slate-900 p-8 border border-slate-800">
                  <select 
                    className="w-full bg-slate-800 text-white p-4 uppercase font-bold text-xs outline-none border border-slate-700"
                    onChange={e => setCompareCars(prev => ({ ...prev, c2: data.inventory.find(c => c.id === e.target.value) || null }))}
                  >
                    <option value="">Vehicle 2...</option>
                    {data.inventory.map(c => <option key={c.id} value={c.id}>{c.year} {c.make} {c.model}</option>)}
                  </select>
                  {compareCars.c2 && <img src={compareCars.c2.images[0]} className="w-full h-64 object-cover mt-8 grayscale hover:grayscale-0 transition-all" />}
                </div>
             </div>
             {compareCars.c1 && compareCars.c2 && (
               <div className="bg-slate-900 p-8 border border-slate-800 animate-in zoom-in-95 duration-500">
                 <ComparisonChart car1={compareCars.c1} car2={compareCars.c2} />
               </div>
             )}
          </div>
        )}

        {currentPage === 'admin' && (
          !isAdminAuthenticated ? (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
               <div className="bg-slate-900 p-10 border border-slate-800 shadow-2xl max-w-md w-full relative">
                 <div className="absolute top-0 left-0 right-0 h-1 bg-rocket-500" />
                 <h2 className="text-center text-2xl font-display font-bold uppercase text-white mb-8 tracking-widest">Security Terminal</h2>
                 <form onSubmit={handleAdminLogin} className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Staff Identity</label>
                     <input type="text" value={adminCreds.user} onChange={e => setAdminCreds({...adminCreds, user: e.target.value})} className="w-full bg-slate-800 border border-slate-700 p-4 text-white outline-none focus:border-rocket-500 transition-colors" placeholder="Username" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Access Key</label>
                     <div className="relative">
                        <input type={showPassword ? "text" : "password"} value={adminCreds.pass} onChange={e => setAdminCreds({...adminCreds, pass: e.target.value})} className="w-full bg-slate-800 border border-slate-700 p-4 text-white outline-none focus:border-rocket-500 pr-12 transition-colors" placeholder="••••••••" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                     </div>
                   </div>
                   <button type="submit" className="w-full bg-rocket-500 text-slate-950 font-bold uppercase py-4 hover:bg-white transition-all tracking-widest text-xs">Authorize Session</button>
                 </form>
               </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row min-h-screen bg-slate-950">
               <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col h-full">
                  <div className="mb-10 flex items-center gap-3 text-white">
                    <LayoutDashboard className="text-rocket-500" />
                    <span className="font-display font-bold text-xl uppercase tracking-wider">CMS 1.0</span>
                  </div>
                  <nav className="space-y-2 flex-1">
                    <button className="w-full text-left px-4 py-3 rounded-md bg-rocket-500 text-slate-950 font-bold uppercase text-xs flex items-center gap-3"><ImageIcon className="w-4 h-4" /> Inventory</button>
                    <button className="w-full text-left px-4 py-3 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white font-bold uppercase text-xs flex items-center gap-3"><MonitorPlay className="w-4 h-4" /> Carousel</button>
                    <button className="w-full text-left px-4 py-3 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white font-bold uppercase text-xs flex items-center gap-3"><Ticket className="w-4 h-4" /> Events</button>
                    <button className="w-full text-left px-4 py-3 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white font-bold uppercase text-xs flex items-center gap-3"><Layers className="w-4 h-4" /> Categories</button>
                    <button className="w-full text-left px-4 py-3 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white font-bold uppercase text-xs flex items-center gap-3"><FileText className="w-4 h-4" /> Site Content</button>
                  </nav>
                  {saving && <div className="p-4 text-rocket-500 text-[10px] font-bold uppercase animate-pulse flex items-center gap-2"><Loader2 className="w-3 h-3 animate-spin" /> Saving...</div>}
                  <button onClick={() => setIsAdminAuthenticated(false)} className="mt-auto flex items-center gap-3 text-slate-600 hover:text-white px-4 py-3 font-bold uppercase text-xs tracking-wider transition-colors"><LogOut className="w-4 h-4" /> Logout</button>
               </div>
               <div className="flex-1 p-8">
                  <VehicleAdmin 
                    cars={data.inventory} 
                    categories={data.categories} 
                    onCreate={() => alert("Ready for Server Integration: Create Car Endpoint.")}
                    onEdit={() => alert("Ready for Server Integration: Update Car Endpoint.")}
                    onDelete={id => {
                      if(window.confirm("Delete vehicle?")) {
                        syncToServer({ ...data, inventory: data.inventory.filter(c => c.id !== id) });
                      }
                    }} 
                  />
               </div>
            </div>
          )
        )}
      </main>

      <footer className="bg-slate-950 py-16 px-4 border-t border-slate-900 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
           <div className="text-center md:text-left">
             <BrandLogo theme="light" className="h-14 mb-6 mx-auto md:mx-0" />
             <p className="text-slate-500 max-w-xs leading-relaxed mx-auto md:mx-0">Rocket Motor Company preserves the spirit of high-performance history, one curated build at a time.</p>
           </div>
           <div className="space-y-6">
              <h4 className="text-white font-display font-bold uppercase tracking-widest border-b border-slate-800 pb-2">The Garage</h4>
              <div className="flex flex-col gap-4 text-sm text-slate-400">
                <div className="flex items-start gap-4"><MapPin className="w-5 h-5 text-rocket-500 shrink-0" /><p>{data.siteContent.contact.address}</p></div>
                <div className="flex items-start gap-4"><Phone className="w-5 h-5 text-rocket-500 shrink-0" /><div className="flex flex-col"><p>{data.siteContent.contact.phone1}</p><p>{data.siteContent.contact.phone2}</p></div></div>
                <div className="flex items-start gap-4"><Clock className="w-5 h-5 text-rocket-500 shrink-0" /><div className="flex flex-col"><p>{data.siteContent.contact.openingHoursWeek}</p><p>{data.siteContent.contact.openingHoursSat}</p></div></div>
              </div>
           </div>
           <div className="flex flex-col items-center md:items-end gap-6">
              <h4 className="text-white font-display font-bold uppercase tracking-widest border-b border-slate-800 pb-2 w-full text-center md:text-right">Connectivity</h4>
              <div className="flex gap-6">
                <a href="https://www.youtube.com/channel/UCK-5XeKdcSSwr6BaMrmajWg" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-rocket-500 transition-colors">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/rocketmotorcompany/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-rocket-500 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/p/rocketmotorcompany-100075844017220" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-rocket-500 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="https://www.tiktok.com/@rocketmotorcompany" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-rocket-500 transition-colors">
                  <TiktokIcon className="w-6 h-6" />
                </a>
              </div>
              <button onClick={() => handleNavigate('admin')} className="mt-8 flex items-center gap-2 text-slate-700 hover:text-rocket-500 transition-colors text-[10px] font-bold uppercase tracking-[0.2em]">
                <Lock className="w-3 h-3" /> Personnel Access
              </button>
           </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 text-center md:text-left text-slate-700 text-[10px] font-bold uppercase tracking-widest">
           &copy; 2021 Rocket Motor Company. Curated Classics & Restorations.
        </div>
      </footer>

      <Concierge />
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" onClick={() => setSelectedCar(null)} />
           <div className="relative bg-slate-900 w-full max-w-6xl max-h-[90vh] overflow-y-auto border border-slate-800 animate-in zoom-in-95 duration-300">
              <button onClick={() => setSelectedCar(null)} className="absolute top-6 right-6 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-rocket-500 transition-colors"><X className="w-6 h-6" /></button>
              <div className="flex flex-col md:flex-row">
                 <div className="w-full md:w-3/5">
                    <img src={selectedCar.images[0]} className="w-full h-full object-cover min-h-[400px]" />
                 </div>
                 <div className="w-full md:w-2/5 p-10 space-y-8">
                    <div>
                      <p className="text-rocket-500 font-bold uppercase tracking-[0.2em] mb-2">{selectedCar.year} {selectedCar.make}</p>
                      <h2 className="text-4xl font-display font-bold text-white uppercase">{selectedCar.model}</h2>
                    </div>
                    <p className="text-slate-400 font-light leading-relaxed">{selectedCar.description}</p>
                    <div className="grid grid-cols-2 gap-6 border-y border-slate-800 py-8">
                       <div className="space-y-1"><p className="text-[10px] font-bold text-slate-600 uppercase">Engine</p><p className="text-white font-bold">{selectedCar.specs.engine}</p></div>
                       <div className="space-y-1"><p className="text-[10px] font-bold text-slate-600 uppercase">Odometer</p><p className="text-white font-bold">{selectedCar.specs.mileage.toLocaleString()}</p></div>
                       <div className="space-y-1"><p className="text-[10px] font-bold text-slate-600 uppercase">0-60 MPH</p><p className="text-white font-bold">{selectedCar.specs.zeroToSixty}s</p></div>
                       <div className="space-y-1"><p className="text-[10px] font-bold text-slate-600 uppercase">Class</p><p className="text-white font-bold">{selectedCar.type}</p></div>
                    </div>
                    <button className="w-full bg-rocket-500 text-slate-950 py-5 font-bold uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-rocket-900/10">Inquire for Pricing</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
