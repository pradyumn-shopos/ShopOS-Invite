import React from 'react';
import { motion } from 'motion/react';
import { RunawayButton } from './RunawayButton';
import { ArrowDoodle, StarDoodle, ScribbleUnderline } from './Doodles';

interface LandingViewProps {
  onYes: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onYes }) => {
  return (
    <div className="relative w-full min-h-dvh flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Decorative BG Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-10 left-10 md:left-1/4 text-pink-500 opacity-20 -rotate-12 pointer-events-none"
      >
        <StarDoodle className="w-24 h-24" />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-20 right-5 md:right-1/4 text-yellow-500 opacity-30 rotate-12 pointer-events-none"
      >
        <ArrowDoodle className="w-32 h-32" />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 max-w-2xl relative w-full flex flex-col items-center"
      >
        {/* Context Pill */}
        <motion.div 
            initial={{ scale: 0, rotate: 10 }}
            animate={{ scale: 1, rotate: -2 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 border border-zinc-900 bg-white px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase">
                Feb 23 • HSR Layout • 7:00 PM
            </span>
        </motion.div>
        
        {/* Headline */}
        <h1 className="font-hand text-6xl md:text-8xl mb-8 leading-[0.9] text-shopos-black relative">
          Are you coming to the<br/>
          <span className="relative inline-block mt-2">
             ShopOS Party?
             <ScribbleUnderline className="absolute -bottom-2 left-0 w-full text-pink-500 h-6 -z-10" />
          </span>
        </h1>
        
        {/* Cheeky Subtext */}
        <p className="font-mono text-zinc-600 text-sm md:text-base max-w-md mx-auto mb-16 leading-relaxed">
            You’ve been personally summoned.
            <br/>
            We are watching your answer.
            <br/>
            <span className="text-xs text-zinc-400 italic mt-2 block">(Don't make this awkward.)</span>
        </p>

        {/* Action Area - Just the YES button here, NO is fixed/floating */}
        <div className="relative flex items-center justify-center w-full">
            <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onYes}
                className="group relative bg-pink-500 hover:bg-pink-400 text-white font-scribble text-5xl px-16 py-6 rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1 border-2 border-black transition-colors z-40 outline-none focus:ring-4 ring-pink-300"
            >
                <span className="relative z-10">YES!</span>
                
                {/* Button scribbles */}
                <svg className="absolute top-2 right-2 w-4 h-4 text-pink-200 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 10 10">
                    <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="2" />
                </svg>
            </motion.button>
        </div>

      </motion.div>

      {/* The Runaway NO Button - Lives outside the flow to maximize chaos */}
      <RunawayButton />
      
    </div>
  );
};