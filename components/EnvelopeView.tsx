import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, getRandomItem } from '../utils';
import { EVENT_DETAILS, NO_BUTTON_PHRASES } from '../constants';
import { StarDoodle, ArrowDoodle, CircleDoodle, SpiralDoodle } from './Doodles';
import { ShopOSLogo } from './ShopOSLogo';

interface EnvelopeViewProps {
  onOpen: () => void;
}

export const EnvelopeView: React.FC<EnvelopeViewProps> = ({ onOpen }) => {
  const [step, setStep] = useState<'intro' | 'envelope' | 'letter'>('intro');
  const [isOpen, setIsOpen] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [noBtnText, setNoBtnText] = useState("NO");

  // Auto-advance
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('envelope');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEnvelopeClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    setTimeout(() => setStep('letter'), 800);
  };

  const handleNoHover = () => {
    // Chaos constrained to safe zone (relative to initial position)
    const maxDist = 500;
    
    // Clamp to ensure visibility inside the letter container
    let newX = (Math.random() - 0.5) * 500;
    let newY = (Math.random() - 0.5) * 700;
    
    newX = Math.max(-50, Math.min(350, newX)); 
    newY = Math.max(-650, Math.min(50, newY));

    setNoBtnPos({ x: newX, y: newY });
    setNoBtnText(getRandomItem(NO_BUTTON_PHRASES));
  };

  return (
    <div className="flex items-center justify-center w-full h-dvh relative z-20 overflow-hidden bg-[#FDFBF7]">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[#FDFBF7]"></div>

      {/* Intro Light Effect */}
      <AnimatePresence>
        {step === 'intro' && (
             <motion.div 
                key="light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
                 <div className="w-[600px] h-[600px] bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-300 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-pulse"></div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">

          {/* THE LOGO (Transitions from 3D Floating to Envelope Seal) */}
          <motion.div
             layoutId="shopos-logo"
             className={cn(
                 "absolute z-50 flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer",
                 step === 'intro' ? "w-80 h-80" : "w-16 h-16 bg-white rounded-full shadow-md hover:scale-105"
             )}
             onClick={step === 'envelope' ? handleEnvelopeClick : undefined}
             animate={{
                 opacity: isOpen ? 0 : 1,
                 scale: isOpen ? 0.5 : 1, 
                 rotateX: step === 'intro' ? 20 : 0, 
                 rotateY: step === 'intro' ? -20 : 0,
                 rotate: step === 'intro' ? 0 : 10,
                 y: step === 'intro' ? [0, -20, 0] : 0 
             }}
             transition={{ 
                 default: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
                 y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                 opacity: { duration: 0.3 }
             }}
             style={{ perspective: 1000 }}
          >
              <ShopOSLogo className={cn("transition-all duration-1000", step === 'intro' ? "w-full h-full drop-shadow-2xl" : "w-8 h-8 opacity-80 mix-blend-multiply")} />
          </motion.div>


          {/* ENVELOPE (Fades in behind the logo) */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
             animate={{ 
                 opacity: step === 'intro' ? 0 : (step === 'letter' ? 0 : 1), 
                 scale: step === 'intro' ? 0.8 : 1,
                 rotateX: step === 'intro' ? 10 : 0,
                 y: isOpen ? 400 : 0, 
             }}
             transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
             className="relative w-[280px] h-[200px] sm:w-[340px] sm:h-[240px] md:w-[500px] md:h-[350px]"
          >
               {/* Envelope Back */}
               <div className="absolute inset-0 bg-zinc-100 shadow-2xl rounded-sm border border-zinc-200 overflow-hidden"></div>

               {/* Letter Peeking Out */}
               <motion.div 
                    layoutId="letter-paper"
                    className="absolute z-10 w-[90%] h-[90%] left-[5%] bg-white shadow-sm border border-zinc-100 origin-bottom"
                    initial={{ y: 0 }}
                    animate={{ y: isOpen ? -150 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
               />

               {/* Flap */}
               <motion.div 
                  className="absolute top-0 left-0 w-full h-1/2 origin-top z-30"
                  style={{ perspective: 1000 }}
                  animate={{ rotateX: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
               >
                  <div className="w-full h-full bg-zinc-200 rounded-b-xl shadow-sm border-b border-l border-r border-zinc-300" 
                       style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
                  ></div>
               </motion.div>

               {/* Front Triangles */}
               <div className="absolute inset-0 z-20 pointer-events-none">
                   <div className="absolute bottom-0 left-0 w-full h-full bg-zinc-100" style={{ clipPath: 'polygon(0 0, 50% 50%, 0 100%)', filter: 'brightness(0.95)' }}></div>
                   <div className="absolute bottom-0 right-0 w-full h-full bg-zinc-100" style={{ clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)', filter: 'brightness(0.92)' }}></div>
                   <div className="absolute bottom-0 left-0 w-full h-full bg-zinc-50" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}></div>
               </div>

               {/* Text Decoration */}
               <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pt-32 pointer-events-none opacity-60">
                    <span className="font-scribble text-2xl text-zinc-600 -rotate-2">To: You</span>
                    <span className="font-mono text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">(Open me)</span>
               </div>
               
               {/* Star Doodle */}
               <div className="absolute top-8 right-8 w-10 h-10 text-yellow-400 rotate-12 opacity-80 z-20">
                    <StarDoodle />
               </div>

               {/* Click Trigger Area */}
               <div className="absolute inset-0 z-40 cursor-pointer" onClick={handleEnvelopeClick}></div>
          </motion.div>


          {/* FULL SCREEN LETTER */}
          {step === 'letter' && (
            <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 overflow-y-auto bg-black/5 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full min-h-screen flex items-center justify-center py-10 px-2 sm:py-10 pointer-events-none">
                    <motion.div 
                        layoutId="letter-paper"
                        className="w-full max-w-2xl bg-white shadow-2xl p-6 pt-16 pb-12 sm:p-14 relative -rotate-1 min-h-[70vh] flex flex-col justify-center overflow-hidden pointer-events-auto"
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                        
                        {/* Tape */}
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-200/50 rotate-1"
                    ></motion.div>

                    {/* Doodles */}
                    <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.6, scale: 1 }} transition={{ delay: 0.6 }} className="absolute top-10 right-10 w-12 h-12 text-yellow-400 rotate-12">
                        <StarDoodle />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.4, scale: 1 }} transition={{ delay: 0.7 }} className="absolute bottom-20 left-10 w-16 h-16 text-pink-300 -rotate-12">
                        <SpiralDoodle />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="relative z-10 space-y-8 text-center"
                    >
                        
                        <div className="space-y-4 pt-4 sm:pt-0">
                             <h1 className="font-hand text-4xl sm:text-5xl md:text-6xl text-zinc-900 leading-[0.9]">
                                We need a break.
                             </h1>
                             <p className="font-hand text-xl sm:text-2xl text-zinc-400">
                                (You probably do too.)
                             </p>
                        </div>

                        <div className="font-hand text-lg sm:text-xl md:text-2xl text-zinc-700 space-y-4 sm:space-y-6 leading-relaxed text-left max-w-lg mx-auto py-4">
                            <p>Hey,</p>
                            <p>
                                We finally have a place we can call home.
                            </p>
                            <p>
                                So we’re opening the doors and inviting people we like over to see it.
                            </p>
                            <p>
                                We’re hosting a small opening gathering on <span className="font-bold bg-yellow-100 px-1 decoration-wavy underline decoration-pink-300">Feb 23</span> at our new office in <span className="font-bold bg-yellow-100 px-1 decoration-wavy underline decoration-pink-300">HSR,</span> with the ShopOS team, good music, drinks, food, and a bunch of people who’ve been building interesting things for a while now.
                            </p>
                            <p>
                                We’d love for you to drop by, say hi, and spend some time with us.
                            </p>
                            <p>
                                Hope you can make it.
                            </p>
                            <p className="pt-2">
                                — Team ShopOS
                            </p>
                        </div>

                        {/* Details */}
                        <div className="border-t border-dashed border-zinc-200 pt-8 mt-4 relative">
                             {/* Circle Doodle */}
                             <div className="absolute -top-6 left-1/4 w-24 h-24 text-pink-400/30 -rotate-6 pointer-events-none">
                                 <CircleDoodle />
                             </div>

                             <div className="flex justify-center gap-6 sm:gap-12 font-mono text-xs sm:text-sm uppercase tracking-widest text-zinc-500">
                                 <div className="text-center">
                                     <span className="text-zinc-900 font-bold block text-base sm:text-lg mb-1">Feb 23rd</span>
                                     <span>7:00 PM</span>
                                 </div>
                                 <div className="text-center">
                                     <span className="text-zinc-900 font-bold block text-base sm:text-lg mb-1">ShopOS HSR</span>
                                     <span>Bangalore</span>
                                 </div>
                             </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-8 sm:pt-12 pb-6 relative flex flex-col items-center gap-6 sm:gap-8">
                            <h3 className="font-hand text-xl sm:text-2xl md:text-3xl text-zinc-400 rotate-1 relative inline-block">
                                Are you in?
                                <div className="absolute -right-6 sm:-right-8 -top-3 sm:-top-4 w-6 sm:w-8 h-6 sm:h-8 text-zinc-300 rotate-12">
                                    <ArrowDoodle />
                                </div>
                            </h3>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-16 w-full relative min-h-[60px] sm:min-h-[80px]"> 
                                {/* Runaway NO */}
                                <motion.button
                                    initial={{ x: 0, y: 0 }}
                                    animate={{ 
                                        x: noBtnPos.x * 0.5, 
                                        y: noBtnPos.y * 0.5,
                                        rotate: noBtnPos.x * 0.1 
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    onMouseEnter={handleNoHover}
                                    onTouchStart={handleNoHover}
                                    className="absolute bottom-20 sm:bottom-24 left-8 sm:left-20 bg-zinc-100 text-zinc-400 font-mono text-sm sm:text-xl px-4 sm:px-8 py-2 sm:py-3 rounded-sm border border-zinc-200 cursor-not-allowed uppercase tracking-widest hover:bg-zinc-200 z-50"
                                >
                                    {noBtnText}
                                </motion.button>

                                {/* YES */}
                                <button 
                                    onClick={onOpen}
                                    className="relative bg-pink-500 text-white font-hand text-2xl sm:text-3xl md:text-4xl px-8 sm:px-16 py-3 sm:py-5 hover:-translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black z-10"
                                >
                                    YES!
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
          )}

      </div>
    </div>
  );
};
