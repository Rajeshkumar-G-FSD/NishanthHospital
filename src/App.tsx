import { useState } from 'react';
import Header from './components/Header';
import BookingModal from './components/BookingModal';
import ScrollSequencePlayer from './components/ScrollSequencePlayer';
import TeamCarousel, { TeamMember } from './components/TeamCarousel';

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Abhishant',
    role: 'Chief Medical Director & Senior Pediatrician',
    image: 'https://i.postimg.cc/G9wkSrxf/Dr-Abhishant.avif',
    bio: 'An expert in medical administration and comprehensive pediatric wellness with a rich background of clinical leadership.',
  },
  {
    id: '2',
    name: 'Dr. Padmanaban',
    role: 'Senior Obstetrician & Gynecologist',
    image: 'https://i.postimg.cc/XXSwD3kt/Dr-Padmanaban.avif',
    bio: 'Renowned expert in high-risk maternity care and advanced minimally invasive gynecological surgical treatments.',
  },
  {
    id: '3',
    name: 'Dr. Sumathi',
    role: 'Senior Gynaecologic Surgeon',
    image: 'https://i.postimg.cc/CMZXtN4z/Dr-Sumathi.avif',
    bio: 'Dedicated practitioner specializing in comprehensive female healthcare, reproductive wellness, and aesthetic gynecological therapies.',
  },
  {
    id: '4',
    name: 'Dr. Srthi',
    role: 'Specialist in Maternal-Fetal Medicine',
    image: 'https://i.postimg.cc/SQX35rGQ/Dr-Srthi.avif',
    bio: 'Dedicated to advanced fetal scanning, prenatal diagnosis, and supportive family counseling protocols.',
  },
  {
    id: '5',
    name: 'Dr. Anbarasan',
    role: 'Consultant Neonatologist & Pediatric Specialist',
    image: 'https://i.postimg.cc/QVGpnsJR/Dr-Anbarasan.avif',
    bio: 'Provides stellar level IV neonatal protection, tracking infant milestones, and critical care management for preterm newborns.',
  }
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500/25 selection:text-rose-200" id="maternity-app-root">
      
      {/* Main Header Component with navigation actions */}
      <Header onContactClick={handleOpenModal} />

      {/* Immersive Scroll Sequence Hero Section and Team Carousel */}
      <main className="w-full grow relative z-10" id="main-content-area">
        <ScrollSequencePlayer onOpenBooking={handleOpenModal} />
        
        {/* High-quality Carousel showing professional maternity, gynecological, and pediatric experts */}
        <TeamCarousel 
          members={TEAM_MEMBERS} 
          title="Meet Our Core Team of Consultants" 
          titleSize="md"
          titleColor="rgb(244, 63, 94)"
          autoPlay={5000}
          grayscaleEffect={false}
          className="relative z-20"
        />
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
