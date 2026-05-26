import { useState, useRef, useEffect } from 'react';
import { Heart, Phone, Sparkles, Activity, Baby, MapPin, ChevronDown, Menu as MenuIcon, X, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onContactClick: () => void;
  currentView: 'home' | 'about' | 'why-choose' | 'magizh' | 'contact' | 'doctor';
  onViewChange: (view: 'home' | 'about' | 'why-choose' | 'magizh' | 'contact' | 'doctor') => void;
}

const MENU_ITEMS = [
  { 
    id: 'home', 
    label: 'Home', 
    desc: 'Sequence play walk & core doctors', 
    icon: Heart, 
    accent: 'text-rose-400 bg-rose-500/10' 
  },
  { 
    id: 'about', 
    label: 'About Us', 
    desc: '25 years of excellence & standards', 
    icon: Sparkles, 
    accent: 'text-amber-400 bg-amber-500/10' 
  },
  { 
    id: 'why-choose', 
    label: 'Why Choose Us', 
    desc: '30,000+ safe deliveries & stats care', 
    icon: Activity, 
    accent: 'text-emerald-400 bg-emerald-500/10' 
  },
  { 
    id: 'magizh', 
    label: 'மகிழ் Care', 
    desc: 'Hope for aspiring parent families', 
    icon: Baby, 
    accent: 'text-rose-400 bg-rose-500/10' 
  },
  { 
    id: 'contact', 
    label: 'Contact Us', 
    desc: 'EM EVN road, phone hotlines & branch', 
    icon: MapPin, 
    accent: 'text-pink-400 bg-pink-500/10' 
  },
  { 
    id: 'doctor', 
    label: 'Doctor Portal', 
    desc: 'Authorized clinical intake analytics', 
    icon: ClipboardList, 
    accent: 'text-sky-400 bg-sky-500/10' 
  }
] as const;

export default function Header({ onContactClick, currentView, onViewChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeItem = MENU_ITEMS.find((item) => item.id === currentView) || MENU_ITEMS[0];
  const ActiveIcon = activeItem.icon;

  return (
    <motion.header 
      id="main-nav-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 flex justify-between items-center bg-slate-950/80 backdrop-blur-md border-b border-white/5"
    >
      {/* Brand Logo - Clicking resets to Home */}
      <div 
        onClick={() => {
          onViewChange('home');
          setIsMenuOpen(false);
        }}
        className="flex items-center space-x-3 group cursor-pointer" 
        id="logo-container"
      >
        <img 
          src="https://i.postimg.cc/d1Mjps1w/Nishanth-logo.avif" 
          alt="Brand Logo" 
          className="h-9 md:h-12 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
          style={{ filter: 'invert(1) hue-rotate(180deg) brightness(1.1)' }}
          referrerPolicy="no-referrer"
          id="brand-logo-image"
        />
      </div>

      {/* Main Interactive Dropdown Navigation Pill */}
      <div className="relative" ref={menuRef} id="nav-dropdown-menu-wrapper">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex items-center space-x-2 md:space-x-3 px-4 md:px-5 py-2 md:py-2.5 rounded-full border bg-slate-900/90 text-slate-200 hover:text-white transition-all font-sans font-bold text-xs md:text-sm shadow-xl backdrop-blur-md cursor-pointer select-none ${
            isMenuOpen 
              ? 'border-rose-500/40 shadow-rose-500/5 text-white' 
              : 'border-white/5 hover:border-white/15'
          }`}
          id="nav-menu-trigger"
        >
          {isMenuOpen ? (
            <X className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <MenuIcon className="w-4 h-4 text-slate-400 shrink-0" />
          )}
          
          <div className="flex items-center space-x-1.5 border-l border-white/10 pl-2">
            <ActiveIcon className="w-3.5 h-3.5 text-rose-400 shrink-0 fill-rose-400/5" />
            <span className="hidden xs:inline text-[11px] uppercase tracking-wider text-slate-400">Nav:</span>
            <span className="text-white">{activeItem.label}</span>
          </div>

          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 text-slate-400 shrink-0 ${isMenuOpen ? 'rotate-180 text-rose-400' : ''}`} />
        </button>

        {/* Floating Stagger Menu Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-14 left-1/2 -translate-x-1/2 w-72 sm:w-80 bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-1 overflow-hidden"
              id="nav-menu-dropdown-layer"
            >
              {/* Optional dynamic atmospheric glow inside menu */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full filter blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-500/5 rounded-full filter blur-xl pointer-events-none" />

              <div className="px-3 py-1.5 border-b border-white/5 mb-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase font-sans select-none">
                Hospital Portal Options
              </div>

              {MENU_ITEMS.map((item, idx) => {
                const ItemIcon = item.icon;
                const isSelected = item.id === currentView;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx }}
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`group w-full text-left flex items-start gap-3 p-2.5 rounded-xl transition-all duration-300 relative cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-900 border border-white/10' 
                        : 'hover:bg-slate-900/60 border border-transparent'
                    }`}
                    id={`menu-item-${item.id}`}
                  >
                    {/* Animated side-bar active indicator inside items */}
                    {isSelected && (
                      <motion.div 
                        layoutId="active-nav-bullet"
                        className="absolute left-1 top-3 bottom-3 w-1 bg-rose-500 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}

                    {/* Left Icon Block */}
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-white/5 transition-colors group-hover:border-white/10 ${item.accent}`}>
                      <ItemIcon className="w-4.5 h-4.5" />
                    </div>

                    {/* Label & Description block */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-sans font-bold text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                          {item.label}
                        </span>
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                        )}
                      </div>
                      <span className="block text-[11px] text-slate-500 group-hover:text-slate-400 font-medium font-sans leading-tight transition-colors">
                        {item.desc}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Action Contact Button */}
      <motion.button
        id="header-contact-btn"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContactClick}
        className="flex items-center space-x-1.5 md:space-x-2 px-3 md:px-4 py-2 rounded-full border border-slate-700/50 bg-slate-900/80 hover:bg-slate-800 text-slate-100 text-xs md:text-sm font-sans font-medium hover:border-slate-600 transition-all cursor-pointer"
      >
        <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400 fill-emerald-500/10" />
        <span className="hidden sm:inline">Urgent Care</span>
        <span className="sm:hidden">Call</span>
      </motion.button>
    </motion.header>
  );
}
