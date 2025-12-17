import React, { useState, useMemo, useEffect } from 'react';
import { CARS, DEFAULT_CATEGORIES, DEFAULT_SITE_CONTENT } from './constants';
import { Car, SiteContent, HeroSlide } from './types';
import Concierge from './components/Concierge';
import ComparisonChart from './components/ComparisonChart';
import { Search, Info, Gauge, Zap, DollarSign, Menu, X, ArrowRight, ChevronDown, Check, Fuel, Calendar, ShieldCheck, Trophy, Wrench, MapPin, Phone, Globe, Clock, Sparkles, Lock, LayoutDashboard, LogOut, Plus, Trash2, Edit, Save, Image as ImageIcon, Layers, FileText, Settings, Upload, Instagram, Facebook, Youtube, MonitorPlay } from 'lucide-react';

// --- Sub-components ---

const BrandLogo = ({ className = "h-10", theme = 'light' }: { className?: string, theme?: 'dark' | 'light' }) => (
  <div className="flex items-center gap-3 select-none">
    {/* Stylized Rocket Icon */}
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
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

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
            <button onClick={() => onNavigate('home')} className="text-slate-300 hover:text-rocket-500 transition-colors text-sm font-bold uppercase tracking-wider">Home</button>
            <button onClick={() => onNavigate('showroom')} className="text-slate-300 hover:text-rocket-500 transition-colors text-sm font-bold uppercase tracking-wider">The Collection</button>
            <button onClick={() => onNavigate('services')} className="text-slate-300 hover:text-rocket-500 transition-colors text-sm font-bold uppercase tracking-wider">Services</button>
            <button onClick={() => onNavigate('compare')} className="text-slate-300 hover:text-rocket-500 transition-colors text-sm font-bold uppercase tracking-wider">Compare</button>
            <button className="bg-rocket-500 text-slate-950 px-6 py-2 rounded-none font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors transform skew-x-[-10deg]">
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
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 shadow-lg">
          <div className="px-4 pt-2 pb-4 space-y-1">
             <button onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-base font-bold text-slate-300 border-b border-slate-800 font-display uppercase">Home</button>
             <button onClick={() => { onNavigate('showroom'); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-base font-bold text-slate-300 border-b border-slate-800 font-display uppercase">The Collection</button>
             <button onClick={() => { onNavigate('services'); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-base font-bold text-slate-300 border-b border-slate-800 font-display uppercase">Services</button>
             <button onClick={() => { onNavigate('compare'); setMobileMenuOpen(false); }} className="block w-full text-left py-3 text-base font-bold text-slate-300 font-display uppercase">Compare</button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onShopNow, content, inventory }: { onShopNow: () => void, content: SiteContent['hero'], inventory: Car[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use custom slides if available, otherwise fallback to top 5 inventory items
  const slides = useMemo(() => {
    if (content.slides && content.slides.length > 0) {
      return content.slides;
    }
    return inventory.slice(0, 5).map(c => ({
      id: c.id,
      image: c.images[0],
      title: `${c.year} ${c.make} ${c.model}`,
      subtitle: 'Featured Vehicle'
    }));
  }, [content.slides, inventory]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [slides.length]);

  const currentHero = slides[currentSlide];

  return (
    <div className="relative h-[700px] overflow-hidden bg-slate-950">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
        </div>
      ))}

      {/* Global Gradients (Static) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start z-10">
        <span className="text-rocket-500 font-bold tracking-[0.3em] text-sm md:text-base mb-4 uppercase">{content.estYear}</span>
        <h1 className="text-6xl md:text-8xl text-white font-display font-bold leading-none mb-6 uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: content.title.replace('.', '<span class="text-rocket-500">.</span>') }}>
        </h1>
        <p className="text-xl text-slate-400 max-w-xl mb-10 font-light leading-relaxed border-l-4 border-rocket-500 pl-6">
          {content.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button 
            onClick={onShopNow}
            className="px-10 py-4 bg-rocket-500 text-slate-950 font-display font-bold uppercase tracking-wider hover:bg-white transition-all shadow-xl shadow-rocket-900/20 flex items-center justify-center gap-2"
          >
            View Inventory <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-10 py-4 border-2 border-slate-700 text-white font-display font-bold uppercase tracking-wider hover:border-rocket-500 hover:text-rocket-500 transition-all">
            Sell Your Classic
          </button>
        </div>

        {/* Slide Indicators / Current Car Label */}
        {slides.length > 0 && currentHero && (
          <div className="absolute bottom-10 right-4 md:right-8 flex flex-col items-end gap-2">
              <div className="flex gap-2 mb-2">
                  {slides.map((_, idx) => (
                      <button 
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-1 transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-rocket-500' : 'w-4 bg-slate-600 hover:bg-slate-400'}`}
                      />
                  ))}
              </div>
              <div className="text-right animate-fade-in">
                  <p className="text-rocket-500 font-bold uppercase text-xs tracking-widest">{currentHero.subtitle}</p>
                  <p className="text-white font-display uppercase text-lg">{currentHero.title}</p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CarCard: React.FC<{ car: Car; onClick: () => void }> = ({ car, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group bg-slate-900 rounded-none overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-rocket-900/10 transition-all duration-500 border border-slate-800 hover:border-rocket-500/50"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={car.images[0]} 
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
        />
        <div className="absolute top-4 left-4">
           <span className="bg-rocket-500 text-slate-950 text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-lg">
             {car.type}
           </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-rocket-500 text-xs font-bold uppercase tracking-widest mb-1">{car.year} {car.make}</p>
            <h3 className="text-2xl font-display font-bold text-white group-hover:text-rocket-500 transition-colors">{car.model}</h3>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm line-clamp-2 mb-6 font-light">{car.description}</p>

        <div className="flex justify-between items-center border-t border-slate-800 pt-4">
           <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
             <Gauge className="w-4 h-4 text-rocket-500" />
             {car.specs.mileage.toLocaleString()} mi
           </div>
        </div>
      </div>
    </div>
  );
};

const CarDetailModal = ({ car, onClose }: { car: Car; onClose: () => void }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 w-full max-w-6xl rounded-lg overflow-hidden shadow-2xl border border-slate-800 animate-fade-in flex flex-col md:flex-row max-h-[95vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/30 hover:bg-rocket-500 text-white rounded-full transition-colors backdrop-blur-md"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="w-full md:w-3/5 relative bg-slate-800 flex flex-col">
           <div className="h-64 md:h-[400px] w-full relative">
              <img src={car.images[activeImage]} alt={car.model} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent h-40 flex items-end p-8 pointer-events-none">
                  <div className="text-white">
                    <p className="text-sm font-bold uppercase tracking-widest text-rocket-500 mb-1">{car.type}</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold">{car.year} {car.make} {car.model}</h2>
                  </div>
              </div>
           </div>
           {/* Gallery Thumbs */}
           <div className="p-4 bg-slate-900 flex gap-3 overflow-x-auto border-b border-slate-800">
             {car.images.map((img, idx) => (
               <button 
                 key={idx} 
                 onClick={() => setActiveImage(idx)}
                 className={`w-20 h-16 flex-shrink-0 border-2 transition-all ${activeImage === idx ? 'border-rocket-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
               >
                 <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
               </button>
             ))}
           </div>
        </div>
        
        <div className="w-full md:w-2/5 p-8 md:p-10 overflow-y-auto bg-slate-900 flex flex-col">
          <div className="prose prose-invert mb-8">
            <h3 className="text-white font-display font-bold uppercase text-lg mb-3">Vehicle Story</h3>
            <p className="text-slate-400 leading-relaxed font-light">
              {car.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="border-l-2 border-rocket-500 pl-4">
              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Odometer</p>
              <p className="text-xl font-bold text-white font-display">{car.specs.mileage.toLocaleString()}</p>
            </div>
            <div className="border-l-2 border-slate-700 pl-4">
              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Engine</p>
              <p className="text-lg font-bold text-white font-display truncate" title={car.specs.engine}>{car.specs.engine}</p>
            </div>
             <div className="border-l-2 border-slate-700 pl-4">
              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">0-60 mph</p>
              <p className="text-xl font-bold text-white font-display">{car.specs.zeroToSixty}s</p>
            </div>
            <div className="border-l-2 border-slate-700 pl-4">
              <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">Top Speed</p>
              <p className="text-xl font-bold text-white font-display">{car.specs.topSpeedMph} mph</p>
            </div>
          </div>

          <div className="mb-auto">
            <h3 className="text-white font-display font-bold uppercase text-lg mb-4">Build Features</h3>
            <ul className="space-y-3">
              {car.features.map((feat, idx) => (
                <li key={idx} className="flex items-center text-slate-300 text-sm">
                  <Check className="w-4 h-4 text-rocket-500 mr-3" /> {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 space-y-3">
             <button className="w-full py-4 bg-rocket-500 text-slate-950 font-display font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Inquire to Purchase
            </button>
            <button className="w-full py-4 border-2 border-slate-700 text-white font-display font-bold uppercase tracking-widest hover:border-rocket-500 hover:text-rocket-500 transition-colors">
              Schedule Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Admin Components ---

const AdminDashboard = ({ 
  cars, 
  setCars,
  categories,
  setCategories,
  siteContent,
  setSiteContent,
  onLogout 
}: { 
  cars: Car[], 
  setCars: (cars: Car[]) => void, 
  categories: string[],
  setCategories: (cats: string[]) => void,
  siteContent: SiteContent,
  setSiteContent: (content: SiteContent) => void,
  onLogout: () => void 
}) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'categories' | 'content' | 'carousel'>('vehicles');
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  // --- Vehicle Logic ---
  const initialCarState: Car = {
    id: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    type: categories[0] || 'Uncategorized',
    images: [''],
    description: '',
    specs: {
      horsepower: 0,
      topSpeedMph: 0,
      zeroToSixty: 0,
      engine: '',
      mileage: 0,
      mpgCity: 0,
      mpgHwy: 0
    },
    features: []
  };

  const [carFormData, setCarFormData] = useState<Car>(initialCarState);

  const handleEditCar = (car: Car) => {
    setEditingCar(car);
    setCarFormData(car);
    setActiveTab('vehicles');
  };

  const handleCreateCar = () => {
    setEditingCar(null);
    setCarFormData({ ...initialCarState, id: Date.now().toString() });
  };

  const handleDeleteCar = (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setCars(cars.filter(c => c.id !== id));
    }
  };

  const handleSaveCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCar) {
      setCars(cars.map(c => c.id === editingCar.id ? carFormData : c));
    } else {
      setCars([...cars, { ...carFormData, id: Date.now().toString() }]);
    }
    setEditingCar(null);
    setCarFormData(initialCarState);
  };

  const updateSpec = (field: keyof typeof carFormData.specs, value: string | number) => {
    setCarFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [field]: value }
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...carFormData.images];
    newImages[index] = value;
    setCarFormData({ ...carFormData, images: newImages });
  };

  const addImageField = () => {
    setCarFormData({ ...carFormData, images: [...carFormData.images, ''] });
  };
  
  const removeImageField = (index: number) => {
    if (carFormData.images.length > 1) {
      const newImages = carFormData.images.filter((_, i) => i !== index);
      setCarFormData({ ...carFormData, images: newImages });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
           if (typeof reader.result === 'string') {
             setCarFormData(prev => ({
                 ...prev, 
                 images: [...prev.images.filter(i => i.trim() !== ''), reader.result as string]
             }));
           }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // --- Category Logic ---
  const [newCategory, setNewCategory] = useState('');
  
  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (cat: string) => {
    if (window.confirm(`Delete category "${cat}"? Vehicles with this category will be preserved but unchecked.`)) {
      setCategories(categories.filter(c => c !== cat));
    }
  };

  // --- Content Logic ---
  const [contentForm, setContentForm] = useState<SiteContent>(siteContent);
  const handleSaveContent = () => {
    setSiteContent(contentForm);
    alert('Site content updated successfully!');
  };

  // --- Carousel Logic ---
  const handleAddSlide = () => {
    const newSlide: HeroSlide = { 
      id: Date.now().toString(), 
      image: '', 
      title: 'New Featured Vehicle', 
      subtitle: 'Featured' 
    };
    setContentForm(prev => ({
      ...prev,
      hero: {
        ...prev.hero,
        slides: [...(prev.hero.slides || []), newSlide]
      }
    }));
  };

  const handleDeleteSlide = (index: number) => {
    setContentForm(prev => {
      const newSlides = [...(prev.hero.slides || [])];
      newSlides.splice(index, 1);
      return {
        ...prev,
        hero: {
          ...prev.hero,
          slides: newSlides
        }
      };
    });
  };

  const handleSlideChange = (index: number, field: keyof HeroSlide, value: string) => {
    setContentForm(prev => {
      const newSlides = [...(prev.hero.slides || [])];
      newSlides[index] = { ...newSlides[index], [field]: value };
      return {
        ...prev,
        hero: {
          ...prev.hero,
          slides: newSlides
        }
      };
    });
  };

  const handleCarouselFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleSlideChange(index, 'image', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderSidebar = () => (
    <div className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col h-full min-h-screen">
      <div className="mb-10 flex items-center gap-3 text-white">
        <LayoutDashboard className="text-rocket-500" />
        <span className="font-display font-bold text-xl uppercase tracking-wider">CMS Panel</span>
      </div>
      
      <nav className="space-y-2 flex-1">
        <button 
          onClick={() => { setActiveTab('vehicles'); setEditingCar(null); setCarFormData(initialCarState); }}
          className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 font-bold uppercase text-xs tracking-wider transition-all ${activeTab === 'vehicles' ? 'bg-rocket-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <ImageIcon className="w-4 h-4" /> Vehicles
        </button>
        <button 
          onClick={() => setActiveTab('carousel')}
          className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 font-bold uppercase text-xs tracking-wider transition-all ${activeTab === 'carousel' ? 'bg-rocket-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <MonitorPlay className="w-4 h-4" /> Carousel
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 font-bold uppercase text-xs tracking-wider transition-all ${activeTab === 'categories' ? 'bg-rocket-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <Layers className="w-4 h-4" /> Categories
        </button>
        <button 
          onClick={() => { setActiveTab('content'); setContentForm(siteContent); }}
          className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 font-bold uppercase text-xs tracking-wider transition-all ${activeTab === 'content' ? 'bg-rocket-500 text-slate-950' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <FileText className="w-4 h-4" /> Site Content
        </button>
      </nav>

      <button onClick={onLogout} className="mt-auto flex items-center gap-3 text-slate-500 hover:text-white px-4 py-3 font-bold uppercase text-xs tracking-wider">
        <LogOut className="w-4 h-4" /> Logout
      </button>
    </div>
  );

  const renderVehicleForm = () => (
    <div className="bg-slate-900 p-8 border border-slate-800 shadow-sm animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold text-white uppercase">{editingCar ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
        <button onClick={() => { setEditingCar(null); setCarFormData(initialCarState); }} className="text-slate-400 hover:text-white text-xs font-bold uppercase">Cancel</button>
      </div>
      <form onSubmit={handleSaveCar} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Year</label>
              <input type="number" required value={carFormData.year} onChange={e => setCarFormData({...carFormData, year: parseInt(e.target.value)})} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Make</label>
              <input type="text" required value={carFormData.make} onChange={e => setCarFormData({...carFormData, make: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Model</label>
              <input type="text" required value={carFormData.model} onChange={e => setCarFormData({...carFormData, model: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select value={carFormData.type} onChange={e => setCarFormData({...carFormData, type: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image Gallery (Top is Main)</label>
             <div className="space-y-3 mb-4">
               {carFormData.images.map((img, idx) => (
                 <div key={idx} className="flex items-center gap-3 bg-slate-800 p-2 border border-slate-700">
                   <div className="w-16 h-12 bg-slate-900 flex-shrink-0 overflow-hidden relative">
                      {img ? (
                          <img src={img} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600"><ImageIcon className="w-4 h-4"/></div>
                      )}
                   </div>
                   <input 
                      type="text" 
                      placeholder="Image URL..." 
                      value={img.startsWith('data:') ? '(Uploaded Image Data)' : img} 
                      readOnly={img.startsWith('data:')}
                      onChange={e => handleImageChange(idx, e.target.value)} 
                      className={`flex-1 p-2 bg-slate-900 border border-slate-700 text-slate-300 text-xs focus:border-rocket-500 outline-none ${img.startsWith('data:') ? 'italic text-slate-500 cursor-not-allowed' : ''}`}
                   />
                   <button type="button" onClick={() => removeImageField(idx)} className="p-2 text-slate-500 hover:text-red-500"><X className="w-4 h-4" /></button>
                 </div>
               ))}
             </div>
             <div className="flex gap-4">
                <button type="button" onClick={addImageField} className="text-xs font-bold text-rocket-500 hover:text-white uppercase tracking-wider flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-rocket-500 bg-slate-800">
                    <Plus className="w-3 h-3" /> Add URL
                </button>
                <label className="text-xs font-bold text-rocket-500 hover:text-white uppercase tracking-wider flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-rocket-500 bg-slate-800 cursor-pointer">
                    <Upload className="w-3 h-3" /> Upload from Computer
                    <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
             </div>
          </div>

          <div>
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
             <textarea rows={4} required value={carFormData.description} onChange={e => setCarFormData({...carFormData, description: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
          </div>

          <div className="border-t border-slate-800 pt-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Engine</label>
                 <input type="text" value={carFormData.specs.engine} onChange={e => updateSpec('engine', e.target.value)} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none text-sm" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Horsepower</label>
                 <input type="number" value={carFormData.specs.horsepower} onChange={e => updateSpec('horsepower', parseInt(e.target.value))} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none text-sm" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">0-60 (sec)</label>
                 <input type="number" step="0.1" value={carFormData.specs.zeroToSixty} onChange={e => updateSpec('zeroToSixty', parseFloat(e.target.value))} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none text-sm" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Top Speed (mph)</label>
                 <input type="number" value={carFormData.specs.topSpeedMph} onChange={e => updateSpec('topSpeedMph', parseInt(e.target.value))} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none text-sm" />
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 mb-1">Mileage</label>
                 <input type="number" value={carFormData.specs.mileage} onChange={e => updateSpec('mileage', parseInt(e.target.value))} className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none text-sm" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Features (Comma separated)</label>
            <textarea 
              rows={2} 
              value={carFormData.features.join(', ')} 
              onChange={e => setCarFormData({...carFormData, features: e.target.value.split(',').map(s => s.trim())})} 
              className="w-full p-2 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" 
            />
          </div>

          <button type="submit" className="bg-rocket-500 text-slate-950 px-8 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Record
          </button>
      </form>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-950">
      {renderSidebar()}
      
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                 <h1 className="text-3xl font-display font-bold text-white uppercase">Vehicle Inventory</h1>
                 <p className="text-slate-400">Manage showroom listings and details.</p>
              </div>
              {!editingCar && (
                <button onClick={handleCreateCar} className="bg-rocket-500 text-slate-950 px-6 py-2 font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Vehicle
                </button>
              )}
            </div>

            {editingCar || carFormData.id ? renderVehicleForm() : (
              <div className="bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-800 border-b border-slate-700">
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Main Image</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                      <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map(car => (
                      <tr key={car.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="p-4">
                          <img src={car.images[0]} alt={car.model} className="w-16 h-12 object-cover rounded-sm" />
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-white">{car.year} {car.make}</div>
                          <div className="text-sm text-slate-400">{car.model}</div>
                        </td>
                        <td className="p-4 text-sm text-slate-400">{car.type}</td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => handleEditCar(car)} className="p-2 text-slate-500 hover:text-rocket-500 transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteCar(car.id)} className="p-2 text-slate-500 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Carousel Tab */}
        {activeTab === 'carousel' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                 <h1 className="text-3xl font-display font-bold text-white uppercase">Hero Carousel</h1>
                 <p className="text-slate-400">Manage home page slides and images. If empty, the system uses the latest inventory.</p>
              </div>
              <button onClick={handleSaveContent} className="bg-rocket-500 text-slate-950 px-6 py-2 font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Changes
               </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 shadow-sm p-8 space-y-6">
               {(contentForm.hero.slides && contentForm.hero.slides.length > 0) ? (
                 contentForm.hero.slides.map((slide, idx) => (
                   <div key={slide.id} className="bg-slate-800 p-6 border border-slate-700 flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/3 space-y-3">
                         <div className="h-40 bg-slate-900 relative border border-slate-700">
                           {slide.image ? (
                             <img src={slide.image} alt="Preview" className="w-full h-full object-cover" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center text-slate-600">
                               <ImageIcon className="w-8 h-8" />
                             </div>
                           )}
                         </div>
                         <label className="w-full cursor-pointer bg-slate-700 hover:bg-rocket-500 hover:text-slate-950 text-white text-xs font-bold uppercase py-2 flex items-center justify-center gap-2 transition-colors">
                            <Upload className="w-3 h-3" /> Upload from Laptop
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleCarouselFileUpload(idx, e)} />
                         </label>
                      </div>
                      <div className="flex-1 space-y-4">
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Image URL</label>
                            <input 
                              type="text" 
                              value={slide.image} 
                              onChange={(e) => handleSlideChange(idx, 'image', e.target.value)}
                              className="w-full p-2 bg-slate-900 border border-slate-600 text-white text-sm focus:border-rocket-500 outline-none" 
                            />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Headline Title</label>
                            <input 
                              type="text" 
                              value={slide.title} 
                              onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                              className="w-full p-2 bg-slate-900 border border-slate-600 text-white text-sm focus:border-rocket-500 outline-none" 
                            />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subtitle / Tag</label>
                            <input 
                              type="text" 
                              value={slide.subtitle} 
                              onChange={(e) => handleSlideChange(idx, 'subtitle', e.target.value)}
                              className="w-full p-2 bg-slate-900 border border-slate-600 text-white text-sm focus:border-rocket-500 outline-none" 
                            />
                         </div>
                         <div className="pt-2 flex justify-end">
                            <button onClick={() => handleDeleteSlide(idx)} className="text-red-500 hover:text-red-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                               <Trash2 className="w-3 h-3" /> Remove Slide
                            </button>
                         </div>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="text-center py-12 border-2 border-dashed border-slate-800 bg-slate-900/50">
                    <p className="text-slate-500 mb-4">No custom slides active. Showing latest inventory automatically.</p>
                 </div>
               )}

               <button onClick={handleAddSlide} className="w-full py-4 border-2 border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-rocket-500 hover:bg-slate-800 transition-all font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Add New Slide
               </button>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-display font-bold text-white uppercase">Categories</h1>
            
            <div className="bg-slate-900 p-8 border border-slate-800 shadow-sm">
              <div className="flex gap-4 mb-8">
                <input 
                  type="text" 
                  value={newCategory} 
                  onChange={e => setNewCategory(e.target.value)}
                  placeholder="New Category Name"
                  className="flex-1 p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" 
                />
                <button onClick={handleAddCategory} className="bg-slate-800 border border-slate-700 hover:bg-rocket-500 hover:text-slate-950 text-white px-6 font-bold uppercase tracking-wider">Add</button>
              </div>

              <div className="space-y-2">
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-slate-800/50 border border-slate-800">
                    <span className="text-white font-medium">{cat}</span>
                    <button onClick={() => handleDeleteCategory(cat)} className="text-slate-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
           <div className="max-w-4xl mx-auto space-y-8">
             <div className="flex justify-between items-center">
               <h1 className="text-3xl font-display font-bold text-white uppercase">Site Content</h1>
               <button onClick={handleSaveContent} className="bg-rocket-500 text-slate-950 px-6 py-2 font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Changes
               </button>
             </div>

             <div className="space-y-6">
                {/* Hero Section */}
                <div className="bg-slate-900 p-8 border border-slate-800 shadow-sm">
                   <h3 className="text-lg font-bold text-white uppercase mb-6 border-b border-slate-800 pb-2">Hero Section</h3>
                   <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                        <input type="text" value={contentForm.hero.title} onChange={e => setContentForm({...contentForm, hero: {...contentForm.hero, title: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subtitle</label>
                        <textarea rows={3} value={contentForm.hero.subtitle} onChange={e => setContentForm({...contentForm, hero: {...contentForm.hero, subtitle: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Est. Tagline</label>
                        <input type="text" value={contentForm.hero.estYear} onChange={e => setContentForm({...contentForm, hero: {...contentForm.hero, estYear: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                   </div>
                </div>

                {/* Services Section */}
                <div className="bg-slate-900 p-8 border border-slate-800 shadow-sm">
                   <h3 className="text-lg font-bold text-white uppercase mb-6 border-b border-slate-800 pb-2">Services Section</h3>
                   <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Section Title</label>
                        <input type="text" value={contentForm.services.title} onChange={e => setContentForm({...contentForm, services: {...contentForm.services, title: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                        <textarea rows={2} value={contentForm.services.description} onChange={e => setContentForm({...contentForm, services: {...contentForm.services, description: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                   </div>
                </div>

                {/* Contact Section */}
                <div className="bg-slate-900 p-8 border border-slate-800 shadow-sm">
                   <h3 className="text-lg font-bold text-white uppercase mb-6 border-b border-slate-800 pb-2">Footer / Contact</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Address</label>
                        <input type="text" value={contentForm.contact.address} onChange={e => setContentForm({...contentForm, contact: {...contentForm.contact, address: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone 1</label>
                        <input type="text" value={contentForm.contact.phone1} onChange={e => setContentForm({...contentForm, contact: {...contentForm.contact, phone1: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone 2</label>
                        <input type="text" value={contentForm.contact.phone2} onChange={e => setContentForm({...contentForm, contact: {...contentForm.contact, phone2: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Week Hours</label>
                        <input type="text" value={contentForm.contact.openingHoursWeek} onChange={e => setContentForm({...contentForm, contact: {...contentForm.contact, openingHoursWeek: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Weekend Hours</label>
                        <input type="text" value={contentForm.contact.openingHoursSat} onChange={e => setContentForm({...contentForm, contact: {...contentForm.contact, openingHoursSat: e.target.value}})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white rounded-none focus:border-rocket-500 outline-none" />
                      </div>
                   </div>
                </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'showroom' | 'compare' | 'services' | 'admin'>('home');
  
  // App State
  const [inventory, setInventory] = useState<Car[]>(CARS);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);

  // Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [authCreds, setAuthCreds] = useState({ user: '', pass: '' });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filterType, setFilterType] = useState<string>('All');
  
  // Comparison State
  const [compareCar1, setCompareCar1] = useState<Car | null>(null);
  const [compareCar2, setCompareCar2] = useState<Car | null>(null);

  const filteredCars = useMemo(() => {
    if (filterType === 'All') return inventory;
    return inventory.filter(c => c.type === filterType);
  }, [filterType, inventory]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as any);
    window.scrollTo(0,0);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authCreds.user === 'admin' && authCreds.pass === 'rocket') {
      setIsAdminAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password reset link sent to your email (simulated).');
    setShowForgotPassword(false);
  };

  const renderHome = () => (
    <>
      <Hero onShopNow={() => handleNavigate('showroom')} content={siteContent.hero} inventory={inventory} />
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-800 pb-8">
          <div>
            <h2 className="text-4xl font-display font-bold text-white mb-2 uppercase tracking-tight">Latest Arrivals</h2>
            <p className="text-slate-400 font-light">Hand-picked classics added this month</p>
          </div>
          <button 
             onClick={() => handleNavigate('showroom')}
             className="mt-6 md:mt-0 text-rocket-500 hover:text-white font-bold uppercase tracking-wider flex items-center gap-2 transition-colors text-sm"
          >
            View Full Collection <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {inventory.slice(0, 3).map(car => (
            <CarCard key={car.id} car={car} onClick={() => setSelectedCar(car)} />
          ))}
        </div>
      </section>
      
      {/* Brand Values */}
      <section className="bg-slate-900 py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
             <div className="text-center mb-16">
               <h2 className="text-white text-3xl font-display font-bold uppercase tracking-wider">The Rocket Standard</h2>
               <div className="w-24 h-1 bg-rocket-500 mx-auto mt-4"></div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="p-8 bg-slate-950 border border-slate-800 hover:border-rocket-500 transition-colors group">
                    <div className="w-16 h-16 bg-slate-800 group-hover:bg-rocket-500 text-white rounded-none flex items-center justify-center mx-auto mb-6 transition-colors">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3 uppercase">Verified Provenance</h3>
                    <p className="text-slate-400 font-light leading-relaxed">Every vehicle comes with a documented history file and certificate of authenticity.</p>
                </div>
                <div className="p-8 bg-slate-950 border border-slate-800 hover:border-rocket-500 transition-colors group">
                    <div className="w-16 h-16 bg-slate-800 group-hover:bg-rocket-500 text-white rounded-none flex items-center justify-center mx-auto mb-6 transition-colors">
                        <Wrench className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3 uppercase">Master Tech Inspection</h3>
                    <p className="text-slate-400 font-light leading-relaxed">Our in-house master mechanics perform a 200+ point mechanical restoration check.</p>
                </div>
                <div className="p-8 bg-slate-950 border border-slate-800 hover:border-rocket-500 transition-colors group">
                    <div className="w-16 h-16 bg-slate-800 group-hover:bg-rocket-500 text-white rounded-none flex items-center justify-center mx-auto mb-6 transition-colors">
                        <Trophy className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3 uppercase">Concours Ready</h3>
                    <p className="text-slate-400 font-light leading-relaxed">Detailed to perfection, our cars are ready for the show field or the open road.</p>
                </div>
             </div>
        </div>
      </section>
    </>
  );

  const renderShowroom = () => (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-display font-bold text-white mb-8 uppercase">The Collection</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {['All', ...categories].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 border-2 text-sm font-bold uppercase tracking-wider transition-all ${
                filterType === type 
                  ? 'bg-white text-slate-950 border-white' 
                  : 'bg-transparent text-slate-400 border-slate-700 hover:border-rocket-500 hover:text-rocket-500'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCars.map(car => (
          <CarCard key={car.id} car={car} onClick={() => setSelectedCar(car)} />
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display font-bold text-white mb-6 uppercase">{siteContent.services.title}</h1>
        <p className="text-slate-400 font-light text-lg max-w-2xl mx-auto">
          {siteContent.services.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Car Detailing */}
        <div className="bg-slate-900 p-8 border border-slate-800 shadow-sm hover:shadow-xl transition-all group">
            <div className="h-64 overflow-hidden mb-8 relative">
                <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop" alt="Car Detailing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase group-hover:text-rocket-500 transition-colors">Premium Car Detailing</h3>
            <p className="text-slate-400 font-light leading-relaxed mb-6">
                Our concours-level detailing service goes beyond a wash. We use pH-neutral products, clay bar treatments, and multi-stage paint correction to restore your vehicle's finish to showroom glory. Interior leather conditioning and wood trim preservation included.
            </p>
            <ul className="space-y-2 mb-8 text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rocket-500"/> Paint Correction & Ceramic Coating</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rocket-500"/> Leather Cleaning & Conditioning</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rocket-500"/> Engine Bay Detail</li>
            </ul>
            <button className="text-rocket-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2">Book Appointment <ArrowRight className="w-4 h-4" /></button>
        </div>

        {/* Free Maintenance */}
        <div className="bg-slate-900 p-8 border border-slate-800 shadow-sm hover:shadow-xl transition-all group">
            <div className="h-64 overflow-hidden mb-8 relative">
                <img src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2070&auto=format&fit=crop" alt="Mechanic" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute top-4 left-4">
                   <span className="bg-rocket-500 text-slate-950 text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-lg">
                     Exclusive for Buyers
                   </span>
                </div>
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4 uppercase group-hover:text-rocket-500 transition-colors">Free Maintenance Program</h3>
            <p className="text-slate-400 font-light leading-relaxed mb-6">
                When you purchase a vehicle from Rocket Motor Company, you join the family. We provide 12 months of complimentary scheduled maintenance to ensure your classic runs as beautifully as it looks. Peace of mind comes standard.
            </p>
             <ul className="space-y-2 mb-8 text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-rocket-500"/> 12 Months Complimentary Service</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rocket-500"/> Fluid Top-offs & Brake Inspection</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-rocket-500"/> Annual Tune-up</li>
            </ul>
            <button className="text-rocket-500 font-bold uppercase tracking-wider text-sm flex items-center gap-2">Learn More <ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );

  const renderCompare = () => (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-5xl font-display font-bold text-white mb-4 text-center uppercase">Head to Head</h1>
      <p className="text-slate-400 text-center mb-16 font-light text-lg">Compare specs, power, and rarity.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Selector 1 */}
        <div className="bg-slate-900 p-8 border border-slate-800 shadow-sm">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Vehicle 1</label>
          <div className="relative">
            <select 
              className="w-full bg-slate-800 text-white p-4 border-b-2 border-slate-700 focus:border-rocket-500 outline-none appearance-none font-medium"
              onChange={(e) => setCompareCar1(inventory.find(c => c.id === e.target.value) || null)}
              value={compareCar1?.id || ''}
            >
              <option value="">Select a vehicle...</option>
              {inventory.map(c => <option key={c.id} value={c.id}>{c.year} {c.make} {c.model}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-5 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          {compareCar1 && (
             <div className="mt-8 animate-fade-in">
                <img src={compareCar1.images[0]} alt={compareCar1.model} className="w-full h-56 object-cover mb-6 grayscale hover:grayscale-0 transition-all duration-500" />
                <h3 className="text-2xl font-display font-bold text-white uppercase">{compareCar1.make} {compareCar1.model}</h3>
             </div>
          )}
        </div>

        {/* Selector 2 */}
        <div className="bg-slate-900 p-8 border border-slate-800 shadow-sm">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Vehicle 2</label>
          <div className="relative">
            <select 
              className="w-full bg-slate-800 text-white p-4 border-b-2 border-slate-700 focus:border-rocket-500 outline-none appearance-none font-medium"
              onChange={(e) => setCompareCar2(inventory.find(c => c.id === e.target.value) || null)}
              value={compareCar2?.id || ''}
            >
              <option value="">Select a vehicle...</option>
              {inventory.map(c => <option key={c.id} value={c.id}>{c.year} {c.make} {c.model}</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-5 w-5 h-5 text-slate-400 pointer-events-none" />
          </div>
          {compareCar2 && (
             <div className="mt-8 animate-fade-in">
                <img src={compareCar2.images[0]} alt={compareCar2.model} className="w-full h-56 object-cover mb-6 grayscale hover:grayscale-0 transition-all duration-500" />
                <h3 className="text-2xl font-display font-bold text-white uppercase">{compareCar2.make} {compareCar2.model}</h3>
             </div>
          )}
        </div>
      </div>

      {compareCar1 && compareCar2 && (
        <div className="bg-slate-900 p-8 lg:p-12 border border-slate-800 shadow-xl animate-fade-in">
           <div className="flex flex-col lg:flex-row gap-16 items-center">
             <div className="w-full lg:w-1/2">
               <h3 className="text-lg font-bold text-white mb-8 text-center uppercase tracking-widest border-b border-slate-800 pb-4">Performance Metric</h3>
               <ComparisonChart car1={compareCar1} car2={compareCar2} />
             </div>
             <div className="w-full lg:w-1/2 space-y-8">
               <h3 className="text-lg font-bold text-white mb-8 uppercase tracking-widest border-b border-slate-800 pb-4">Specification Breakdown</h3>
               
               <div className="grid grid-cols-3 gap-y-6 text-sm md:text-base font-light">
                 <div className="text-slate-500 font-bold uppercase text-xs tracking-wider self-center">Spec</div>
                 <div className="text-rocket-500 font-bold uppercase font-display text-lg">{compareCar1.make}</div>
                 <div className="text-sky-500 font-bold uppercase font-display text-lg">{compareCar2.make}</div>

                 <div className="col-span-3 h-px bg-slate-800"></div>

                 <div className="text-slate-400 font-medium">Mileage</div>
                 <div className="text-white font-bold">{compareCar1.specs.mileage.toLocaleString()} mi</div>
                 <div className="text-white font-bold">{compareCar2.specs.mileage.toLocaleString()} mi</div>

                 <div className="text-slate-400 font-medium">Horsepower</div>
                 <div className="text-white font-bold">{compareCar1.specs.horsepower} hp</div>
                 <div className="text-white font-bold">{compareCar2.specs.horsepower} hp</div>

                 <div className="text-slate-400 font-medium">0-60 mph</div>
                 <div className="text-white font-bold">{compareCar1.specs.zeroToSixty}s</div>
                 <div className="text-white font-bold">{compareCar2.specs.zeroToSixty}s</div>
               </div>
             </div>
           </div>
        </div>
      )}

      {(!compareCar1 || !compareCar2) && (
        <div className="text-center text-slate-600 py-20 border-2 border-dashed border-slate-800 bg-slate-900/50">
          <p className="uppercase tracking-widest text-sm font-bold">Select two vehicles above to begin analysis</p>
        </div>
      )}
    </div>
  );

  const renderAdmin = () => {
    if (!isAdminAuthenticated) {
      if (showForgotPassword) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-slate-950">
             <div className="bg-slate-900 p-10 shadow-xl border-t-4 border-rocket-500 max-w-md w-full animate-fade-in">
               <div className="flex justify-center mb-6">
                 <div className="bg-slate-950 p-3 rounded-full">
                    <Lock className="text-white w-6 h-6" />
                 </div>
               </div>
               <h2 className="text-center text-2xl font-display font-bold uppercase text-white mb-2">Reset Password</h2>
               <p className="text-slate-400 text-center text-sm mb-6">Enter your email to receive recovery instructions.</p>
               <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                     <input type="email" required className="w-full p-3 bg-slate-800 border border-slate-700 text-white focus:border-rocket-500 outline-none transition-colors" placeholder="admin@rocketmotor.com" />
                  </div>
                  <button type="submit" className="w-full bg-rocket-500 text-slate-950 font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors">Send Link</button>
                  <button type="button" onClick={() => setShowForgotPassword(false)} className="w-full text-slate-500 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors mt-4">Back to Login</button>
               </form>
             </div>
          </div>
        );
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
           <div className="bg-slate-900 p-10 shadow-xl border-t-4 border-rocket-500 max-w-md w-full">
             <div className="flex justify-center mb-6">
               <div className="bg-slate-950 p-3 rounded-full">
                  <Lock className="text-white w-6 h-6" />
               </div>
             </div>
             <h2 className="text-center text-2xl font-display font-bold uppercase text-white mb-6">Staff Access</h2>
             <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Username</label>
                   <input type="text" value={authCreds.user} onChange={e => setAuthCreds({...authCreds, user: e.target.value})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white focus:border-rocket-500 outline-none transition-colors" />
                </div>
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                   <input type="password" value={authCreds.pass} onChange={e => setAuthCreds({...authCreds, pass: e.target.value})} className="w-full p-3 bg-slate-800 border border-slate-700 text-white focus:border-rocket-500 outline-none transition-colors" />
                </div>
                
                <div className="flex justify-end">
                  <button type="button" onClick={() => setShowForgotPassword(true)} className="text-xs text-rocket-500 hover:text-white transition-colors">Forgot Password?</button>
                </div>

                <button type="submit" className="w-full bg-rocket-500 text-slate-950 font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors">Login</button>
             </form>
           </div>
        </div>
      );
    }

    return (
      <AdminDashboard 
        cars={inventory} 
        setCars={setInventory} 
        categories={categories}
        setCategories={setCategories}
        siteContent={siteContent}
        setSiteContent={setSiteContent}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setAuthCreds({ user: '', pass: '' });
          handleNavigate('home');
        }} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-rocket-500 selection:text-black">
      <Navbar onNavigate={handleNavigate} />
      
      <main>
        {currentPage === 'home' && renderHome()}
        {currentPage === 'showroom' && renderShowroom()}
        {currentPage === 'services' && renderServices()}
        {currentPage === 'compare' && renderCompare()}
        {currentPage === 'admin' && renderAdmin()}
      </main>

      <footer className="bg-slate-950 py-16 px-4 border-t border-slate-900 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-slate-400 text-sm">
           
           {/* Branding Column */}
           <div className="text-center md:text-left">
             <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
               {/* Brand Logo - Footer Version (Theme Light for dark background) */}
               <BrandLogo theme="light" />
             </div>
             <p className="text-slate-500 max-w-xs leading-relaxed mx-auto md:mx-0">Preserving the spirit of driving, one classic at a time.</p>
           </div>

           {/* Contact / Location Column */}
           <div className="text-center md:text-left space-y-4">
               <h4 className="text-white font-display font-bold uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 inline-block md:block">Visit the Garage</h4>
               <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-center md:justify-start gap-3">
                    <MapPin className="w-5 h-5 text-rocket-500 shrink-0 mt-0.5" />
                    <p className="max-w-xs">{siteContent.contact.address}</p>
                  </div>
                  <div className="flex items-start justify-center md:justify-start gap-3">
                    <Phone className="w-5 h-5 text-rocket-500 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <p>{siteContent.contact.phone1}</p>
                      <p>{siteContent.contact.phone2}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <Globe className="w-5 h-5 text-rocket-500 shrink-0" />
                    <p>rocketmotorcompany.com</p>
                  </div>
                  <div className="flex items-start justify-center md:justify-start gap-3">
                     <Clock className="w-5 h-5 text-rocket-500 shrink-0 mt-0.5" />
                     <div className="flex flex-col">
                       <p className="text-white">{siteContent.contact.openingHoursWeek}</p>
                       <p className="text-white">{siteContent.contact.openingHoursSat}</p>
                       <p className="text-xs text-slate-500 mt-1">Jakarta Province</p>
                     </div>
                  </div>
               </div>
           </div>

           {/* Quick Links Column */}
           <div className="flex flex-col gap-4 text-center md:text-right items-center md:items-end">
             <h4 className="text-white font-display font-bold uppercase tracking-wider mb-2 border-b border-slate-800 pb-2 inline-block md:block">Connect</h4>
             <div className="flex gap-4">
               <a href="https://www.youtube.com/@rocketmotorcompany" target="_blank" rel="noopener noreferrer" className="hover:text-rocket-500 text-slate-400 transition-colors">
                  <Youtube className="w-5 h-5" />
               </a>
               <a href="https://www.tiktok.com/@rocketmotorcompany" target="_blank" rel="noopener noreferrer" className="hover:text-rocket-500 text-slate-400 transition-colors">
                  <TiktokIcon className="w-5 h-5" />
               </a>
               <a href="https://www.instagram.com/rocketmotorcompany/" target="_blank" rel="noopener noreferrer" className="hover:text-rocket-500 text-slate-400 transition-colors">
                  <Instagram className="w-5 h-5" />
               </a>
               <a href="https://www.facebook.com/p/rocketmotorcompany-100075844017220" target="_blank" rel="noopener noreferrer" className="hover:text-rocket-500 text-slate-400 transition-colors">
                  <Facebook className="w-5 h-5" />
               </a>
             </div>
           </div>

        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-slate-600 text-xs">
          <p>&copy; 2021 Rocket Motor Company. All rights reserved.</p>
          <button onClick={() => handleNavigate('admin')} className="flex items-center gap-2 hover:text-rocket-500 transition-colors mt-4 md:mt-0">
            <Lock className="w-3 h-3" /> Staff Access
          </button>
        </div>
      </footer>

      {selectedCar && (
        <CarDetailModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}

      <Concierge />
    </div>
  );
};

export default App;