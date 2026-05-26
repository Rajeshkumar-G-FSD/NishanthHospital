import { Heart, Phone, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  return (
    <motion.header 
      id="main-nav-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 flex justify-between items-center bg-transparent backdrop-blur-[2px]"
    >
      {/* Brand Logo */}
      <div className="flex items-center space-x-3 group cursor-pointer" id="logo-container">
        <img 
          src="https://i.postimg.cc/d1Mjps1w/Nishanth-logo.avif" 
          alt="Brand Logo" 
          className="h-10 md:h-12 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          id="brand-logo-image"
        />
      </div>

      {/* Decorative Accents for the Header */}
      <div className="hidden lg:flex items-center space-x-8 text-sm font-sans font-medium text-slate-600">
        <span className="flex items-center space-x-2 text-rose-600 font-semibold bg-rose-50/50 px-3 py-1 rounded-full border border-rose-100/50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Newborn & Mother Care Excellence</span>
        </span>
      </div>

      {/* Quick Action Contact Button */}
      <motion.button
        id="header-contact-btn"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onContactClick}
        className="flex items-center space-x-2 px-4 py-2 rounded-full border border-slate-200 bg-white/80 hover:bg-white text-slate-800 text-sm font-sans font-medium shadow-2xs hover:shadow-sm transition-all"
      >
        <Phone className="w-4 h-4 text-emerald-600" />
        <span>Urgent Care Line</span>
      </motion.button>
    </motion.header>
  );
}
