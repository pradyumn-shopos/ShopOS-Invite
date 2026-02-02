import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { StarDoodle, SpiralDoodle, CircleDoodle, ArrowDoodle } from './Doodles';
import { EVENT_DETAILS } from '../constants';

interface ConfirmationViewProps {
  onCreateBadge: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({ onCreateBadge }) => {
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Generate Google Calendar Link
  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_DETAILS.name)}&dates=20250223T190000/20250223T230000&details=${encodeURIComponent(EVENT_DETAILS.description)}&location=${encodeURIComponent(EVENT_DETAILS.location)}&sf=true&output=xml`;

  return (
    <div className="w-full min-h-dvh flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#FDFBF7]">
      
      {/* Confetti Explosion */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full"
          style={{ 
              backgroundColor: ['#EC4899', '#EAB308', '#3B82F6', '#10B981'][i % 4],
              left: '50%',
              top: '50%'
          }}
          initial={{ scale: 0 }}
          animate={{ 
              x: (Math.random() - 0.5) * windowSize.width,
              y: (Math.random() - 0.5) * windowSize.height,
              opacity: [1, 1, 0],
              scale: [0, 1, 0.5],
              rotate: Math.random() * 360
          }}
          transition={{ duration: 2, ease: "easeOut", delay: Math.random() * 0.2 }}
        />
      ))}

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center z-10 max-w-2xl w-full space-y-12"
      >
        <div className="relative inline-block">
            <h1 className="font-hand text-7xl md:text-9xl text-zinc-900 mb-4 leading-none">
                You're in!
            </h1>
            <div className="absolute -top-10 -right-12 w-20 h-20 text-yellow-400 rotate-12">
                <StarDoodle />
            </div>
            <p className="font-mono text-sm md:text-base uppercase tracking-[0.2em] text-zinc-400">
                (The list has been updated)
            </p>
        </div>

        <div className="font-hand text-3xl text-zinc-600 leading-relaxed max-w-lg mx-auto">
            <p>We’ve locked in your spot.</p>
            <p className="mt-2 text-zinc-800">Prepare for chaos, cocktails, and zero slides.</p>
        </div>

        {/* Primary Actions */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full pt-8">
            <a 
                href={gCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto bg-white text-zinc-900 border-2 border-zinc-900 font-mono font-bold uppercase tracking-widest px-8 py-4 hover:bg-zinc-50 transition-transform hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm flex items-center justify-center gap-3"
            >
                <span>📅 Add to Calendar</span>
            </a>

            <div className="relative w-full md:w-auto">
                <button 
                    onClick={onCreateBadge}
                    className="w-full md:w-auto bg-pink-500 text-white font-hand text-3xl px-12 py-4 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black relative z-10"
                >
                    Create ID Badge
                </button>
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-16 h-16 text-zinc-300 rotate-[30deg] hidden lg:block">
                    <ArrowDoodle />
                </div>
            </div>
        </div>

      </motion.div>

      {/* Decorative BG */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-20 left-10 w-40 h-40 text-pink-200"><SpiralDoodle /></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 text-blue-200"><CircleDoodle /></div>
      </div>
    </div>
  );
};
