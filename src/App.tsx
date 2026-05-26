import { useState } from 'react';
import Header from './components/Header';
import BookingModal from './components/BookingModal';
import ScrollSequencePlayer from './components/ScrollSequencePlayer';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500/25 selection:text-rose-200" id="maternity-app-root">
      
      {/* Main Header Component with navigation actions */}
      <Header onContactClick={handleOpenModal} />

      {/* Immersive Scroll Sequence Hero Section (full screen experience) */}
      <main className="w-full grow relative z-10" id="main-content-area">
        <ScrollSequencePlayer onOpenBooking={handleOpenModal} />
      </main>

      {/* Elegant, humble, literal footer */}
      <footer className="w-full py-4 text-center border-t border-white/5 bg-slate-950 text-[11px] font-sans font-medium text-slate-500 z-25 relative" id="app-footer">
        © 2026 Nishant Hospital. All rights reserved. Developed by{' '}
        <a 
          href="https://www.datazync.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block text-rose-400 hover:text-amber-400 font-semibold transition-all duration-300 hover:scale-105 hover:underline decoration-rose-400 hover:decoration-amber-400 underline-offset-4"
        >
          www.datazync.com
        </a>
      </footer>

      {/* Interactivity modal popup for appointment scheduling and intake */}
      <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} />
      
    </div>
  );
}
