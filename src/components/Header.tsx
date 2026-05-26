import { Heart, Phone, Sparkles, Activity, Baby, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onContactClick: () => void;
  currentView: 'home' | 'about' | 'why-choose' | 'magizh' | 'contact';
  onViewChange: (view: 'home' | 'about' | 'why-choose' | 'magizh' | 'contact') => void;
}

export default function Header({ onContactClick, currentView, onViewChange }: HeaderProps) {
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
        onClick={() => onViewChange('home')}
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

      {/* Main Navigation Menu Tabs */}
      <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-900/60 p-1 rounded-full border border-white/5" id="nav-tabs-container">
        <button
          onClick={() => onViewChange('home')}
          className={`px-2.5 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-sans font-semibold transition-all duration-300 relative cursor-pointer ${
            currentView === 'home' 
              ? 'text-white' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="nav-tab-home"
        >
          {currentView === 'home' && (
            <motion.span 
              layoutId="active-tab"
              className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-rose-600/30 border border-rose-500/30 rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Heart className={`w-3.5 h-3.5 ${currentView === 'home' ? 'text-rose-500 fill-rose-500/20' : 'text-slate-400'}`} />
            Home
          </span>
        </button>

        <button
          onClick={() => onViewChange('about')}
          className={`px-2.5 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-sans font-semibold transition-all duration-300 relative cursor-pointer ${
            currentView === 'about' 
              ? 'text-white' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="nav-tab-about"
        >
          {currentView === 'about' && (
            <motion.span 
              layoutId="active-tab"
              className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-rose-600/30 border border-rose-500/30 rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Sparkles className={`w-3.5 h-3.5 ${currentView === 'about' ? 'text-amber-400 fill-amber-300/10' : 'text-slate-400'}`} />
            About Us
          </span>
        </button>

        <button
          onClick={() => onViewChange('why-choose')}
          className={`px-2.5 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-sans font-semibold transition-all duration-300 relative cursor-pointer ${
            currentView === 'why-choose' 
              ? 'text-white' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="nav-tab-why-choose"
        >
          {currentView === 'why-choose' && (
            <motion.span 
              layoutId="active-tab"
              className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-rose-600/30 border border-rose-500/30 rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Activity className={`w-3.5 h-3.5 ${currentView === 'why-choose' ? 'text-emerald-400 fill-emerald-300/10' : 'text-slate-400'}`} />
            Why Choose
          </span>
        </button>

        <button
          onClick={() => onViewChange('magizh')}
          className={`px-2.5 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-sans font-semibold transition-all duration-300 relative cursor-pointer ${
            currentView === 'magizh' 
              ? 'text-white' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="nav-tab-magizh"
        >
          {currentView === 'magizh' && (
            <motion.span 
              layoutId="active-tab"
              className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-rose-600/30 border border-rose-500/30 rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <Baby className={`w-3.5 h-3.5 ${currentView === 'magizh' ? 'text-rose-400 fill-rose-300/10' : 'text-slate-400'}`} />
            மகிழ்
          </span>
        </button>

        <button
          onClick={() => onViewChange('contact')}
          className={`px-2.5 md:px-4 py-1.5 rounded-full text-xs md:text-sm font-sans font-semibold transition-all duration-300 relative cursor-pointer ${
            currentView === 'contact' 
              ? 'text-white' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
          id="nav-tab-contact"
        >
          {currentView === 'contact' && (
            <motion.span 
              layoutId="active-tab"
              className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-rose-600/30 border border-rose-500/30 rounded-full"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            <MapPin className={`w-3.5 h-3.5 ${currentView === 'contact' ? 'text-rose-400' : 'text-slate-400'}`} />
            Contact
          </span>
        </button>
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
