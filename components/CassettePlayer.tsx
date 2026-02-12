import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';

// Simple SVG Cassette Tape
const CassetteSVG: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => (
  <svg viewBox="0 0 200 120" className="w-full h-full drop-shadow-md">
    {/* Body */}
    <rect x="0" y="0" width="200" height="120" rx="10" fill="#333" />
    <rect x="10" y="10" width="180" height="100" rx="5" fill="#e0e0e0" />
    
    {/* Label Area */}
    <rect x="20" y="20" width="160" height="60" rx="2" fill="#fff" />
    <line x1="20" y1="35" x2="180" y2="35" stroke="#ff6b6b" strokeWidth="2" />
    <line x1="20" y1="45" x2="180" y2="45" stroke="#4ecdc4" strokeWidth="2" />
    <text x="100" y="70" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#333" className="uppercase tracking-widest font-bold">
      ShopOS Party Mix
    </text>

    {/* Reels Window */}
    <rect x="45" y="45" width="110" height="40" rx="20" fill="#333" opacity="0.1" />

    {/* Left Reel */}
    <motion.g 
      transform="translate(70, 65)"
      animate={{ rotate: isPlaying ? 360 : 0 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
        <circle r="12" fill="white" stroke="#333" strokeWidth="2" />
        <circle r="4" fill="#333" />
        <line x1="-12" y1="0" x2="12" y2="0" stroke="#333" strokeWidth="1" />
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#333" strokeWidth="1" />
    </motion.g>

    {/* Right Reel */}
    <motion.g 
      transform="translate(130, 65)"
      animate={{ rotate: isPlaying ? 360 : 0 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
        <circle r="12" fill="white" stroke="#333" strokeWidth="2" />
        <circle r="4" fill="#333" />
        <line x1="-12" y1="0" x2="12" y2="0" stroke="#333" strokeWidth="1" />
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#333" strokeWidth="1" />
    </motion.g>

    {/* Tape between reels */}
    <path d="M 70 77 Q 100 85 130 77" fill="none" stroke="#111" strokeWidth="2" />

    {/* Screw holes */}
    <circle cx="10" cy="10" r="3" fill="#666" />
    <circle cx="190" cy="10" r="3" fill="#666" />
    <circle cx="10" cy="110" r="3" fill="#666" />
    <circle cx="190" cy="110" r="3" fill="#666" />
  </svg>
);

export const CassettePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Toggle Play
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed):", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      className="fixed bottom-4 left-4 z-50 flex flex-col items-center gap-2 no-print"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* The Player Box */}
      <motion.div
        className="relative w-48 cursor-pointer group"
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Just for wobbly feel, not actually moving far
        dragElastic={0.2}
        onClick={togglePlay}
      >
        <CassetteSVG isPlaying={isPlaying} />
        
        {/* Play/Pause Button Overlay */}
        <div className={cn(
            "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
            isPlaying && !isHovered ? "opacity-0" : "opacity-100 bg-black/10 rounded-xl"
        )}>
             <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                 {isPlaying ? (
                     <div className="flex gap-1">
                         <div className="w-1 h-3 bg-black rounded-full"></div>
                         <div className="w-1 h-3 bg-black rounded-full"></div>
                     </div>
                 ) : (
                     <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1"></div>
                 )}
             </div>
        </div>
      </motion.div>

      {/* Helper Text */}
      <AnimatePresence>
          {!isPlaying && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white px-2 py-1 rounded shadow text-[10px] font-mono uppercase tracking-widest"
              >
                  Play Music
              </motion.div>
          )}
      </AnimatePresence>

      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_febc508520.mp3?filename=lofi-study-112191.mp3" 
        loop 
        preload="none"
        onEnded={() => setIsPlaying(false)}
      />
    </motion.div>
  );
};
