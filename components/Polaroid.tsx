import React from 'react';
import { EVENT_DETAILS, OBSESSIONS } from '../constants';
import { cn, getRandomItem } from '../utils';

interface PolaroidProps {
  className?: string;
  isDeveloping?: boolean;
  guestName?: string;
  customPhotoUrl?: string | null;
}

export const Polaroid: React.FC<PolaroidProps> = ({ className, isDeveloping, guestName, customPhotoUrl }) => {
  const [obsession] = React.useState(() => getRandomItem(OBSESSIONS));
  const [ticketId] = React.useState(() => Math.floor(Math.random() * 9000) + 1000);
  const [randomSeed] = React.useState(() => Math.floor(Math.random() * 1000));

  return (
    <div className={cn(
      "bg-white p-4 pb-8 shadow-2xl transform rotate-1 transition-all duration-1000 printable-ticket origin-center",
      "w-[320px] sm:w-[350px] mx-auto relative",
      className
    )}>
      {/* Tape Effect */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/30 rotate-2 backdrop-blur-sm border border-white/40 shadow-sm z-20 pointer-events-none print:hidden"></div>

      {/* Photo Area */}
      <div className="bg-zinc-900 w-full aspect-square mb-6 relative overflow-hidden group">
        
        {/* Photo Logic */}
        <div className="absolute inset-0 bg-zinc-800">
             {customPhotoUrl ? (
                 <img 
                    src={customPhotoUrl} 
                    className="w-full h-full object-cover grayscale contrast-125 brightness-110"
                    alt="Guest"
                 />
             ) : (
                 <img 
                    src={`https://picsum.photos/seed/${randomSeed}/800/800`} 
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay grayscale contrast-125"
                    alt="Party Vibes"
                 />
             )}
             
             {/* Gradient Overlay for style */}
             <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 to-yellow-500/10 mix-blend-screen pointer-events-none"></div>
             
             {/* Texture Overlay */}
             <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}></div>
        </div>

        {/* Developing Overlay */}
        <div className={cn(
          "absolute inset-0 bg-zinc-950 z-30 transition-opacity duration-[3000ms] ease-in-out pointer-events-none",
          isDeveloping ? "opacity-100" : "opacity-0"
        )}></div>

        {/* Overlay Text inside photo */}
        <div className="absolute bottom-4 left-4 right-4 text-white z-20 mix-blend-difference pointer-events-none">
           <h2 className="font-mono text-xs uppercase tracking-widest opacity-80 mb-1">Admit One</h2>
           <div className="flex justify-between items-end">
             <span className="font-bold font-mono text-xl tracking-tighter">TICKET #{ticketId}</span>
             {/* Simple QR representation */}
             <div className="w-10 h-10 bg-white mix-blend-normal opacity-90 p-1">
                 <div className="w-full h-full border-2 border-black border-dashed"></div>
             </div>
           </div>
        </div>
      </div>

      {/* Handwritten Content */}
      <div className="px-2 space-y-4 text-center">
        <h1 className="font-scribble text-4xl sm:text-5xl leading-[0.8] mb-2 -rotate-1 truncate px-2">
          {guestName ? guestName : EVENT_DETAILS.name}
        </h1>
        {guestName && (
             <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 -mt-2 mb-4">
                Has been summoned to
             </p>
        )}

        <div className="font-mono text-sm space-y-1 text-zinc-600 border-t border-b border-zinc-200 py-3 my-4 dashed-border">
            <p className="flex justify-between">
                <span>WHEN:</span>
                <span className="font-bold text-black">{EVENT_DETAILS.date}</span>
            </p>
            <p className="flex justify-between">
                <span>WHERE:</span>
                <span className="font-bold text-black">{EVENT_DETAILS.location}</span>
            </p>
        </div>

        <div className="relative py-2">
            <span className="font-hand text-xl text-zinc-500 block mb-1">Tonight's Obsession:</span>
            <span className="font-scribble text-4xl text-pink-600 relative inline-block transform -rotate-2">
                {obsession}
                <svg className="absolute -bottom-2 -left-2 w-[110%] h-4 text-yellow-400 -z-10 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
            </span>
        </div>
      </div>
    </div>
  );
};