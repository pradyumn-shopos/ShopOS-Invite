import React from 'react';
import { motion } from 'motion/react';

const StampSVG = ({ type, color }: { type: string; color: string }) => {
  if (type === 'approved') {
    return (
      <svg viewBox="0 0 100 60" className="w-full h-full opacity-90 mix-blend-multiply">
        <rect x="2" y="2" width="96" height="56" rx="4" stroke={color} strokeWidth="3" fill="none" strokeDasharray="5,2" />
        <rect x="8" y="8" width="84" height="44" rx="2" stroke={color} strokeWidth="2" fill="none" />
        <text x="50" y="38" textAnchor="middle" fill={color} fontFamily="stencil, sans-serif" fontSize="22" fontWeight="bold" transform="rotate(-2 50 30)">
          APPROVED
        </text>
      </svg>
    );
  }
  if (type === 'party') {
    return (
      <svg viewBox="0 0 80 80" className="w-full h-full opacity-90 mix-blend-multiply">
        <circle cx="40" cy="40" r="38" stroke={color} strokeWidth="3" fill="none" strokeDasharray="4,4" />
        <text x="40" y="45" textAnchor="middle" fill={color} fontFamily="cursive" fontSize="24" fontWeight="bold" transform="rotate(-15 40 40)">
          Party!
        </text>
      </svg>
    );
  }
  if (type === 'vip') {
    return (
      <svg viewBox="0 0 100 40" className="w-full h-full opacity-90 mix-blend-multiply">
          <path d="M0,20 L10,0 L90,0 L100,20 L90,40 L10,40 Z" fill="none" stroke={color} strokeWidth="3" />
          <text x="50" y="28" textAnchor="middle" fill={color} fontFamily="impact, sans-serif" fontSize="24" letterSpacing="2">
            VIP
          </text>
      </svg>
    );
  }
  return null;
};

export const DraggableStamp: React.FC<{ type: string; color: string; className?: string }> = ({ type, color, className }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      whileHover={{ scale: 1.1, cursor: 'grab' }}
      whileTap={{ scale: 0.9, cursor: 'grabbing' }}
      className={`absolute w-24 h-16 z-50 ${className}`}
    >
      <StampSVG type={type} color={color} />
    </motion.div>
  );
};

export const StampTray: React.FC = () => {
    return (
        <div className="flex gap-4 p-4 mt-8 bg-white/50 backdrop-blur border border-zinc-200 rounded-lg no-print relative z-40">
            <div className="relative w-24 h-16">
                 {/* Stack multiple copies so they can be dragged out */}
                 {[1,2,3].map(i => (
                     <DraggableStamp key={`s1-${i}`} type="approved" color="#ef4444" className="top-0 left-0" />
                 ))}
            </div>
            <div className="relative w-24 h-16">
                 {[1,2,3].map(i => (
                     <DraggableStamp key={`s2-${i}`} type="party" color="#3b82f6" className="top-0 left-0" />
                 ))}
            </div>
             <div className="relative w-24 h-16">
                 {[1,2,3].map(i => (
                     <DraggableStamp key={`s3-${i}`} type="vip" color="#eab308" className="top-0 left-0" />
                 ))}
            </div>
            
            <div className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                Sticker Station
            </div>
        </div>
    );
}
