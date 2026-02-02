import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Polaroid } from './Polaroid';
import { SpiralDoodle } from './Doodles';
import { CameraCapture } from './CameraCapture';
import { cn } from '../utils';

interface TicketViewProps {
  onBack: () => void;
}

type TicketStep = 'personalize' | 'developing' | 'ready';

export const TicketView: React.FC<TicketViewProps> = ({ onBack }) => {
  const [step, setStep] = useState<TicketStep>('personalize');
  const [guestName, setGuestName] = useState('');
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  
  // Auto-advance from developing to ready
  useEffect(() => {
    if (step === 'developing') {
      const timer = setTimeout(() => {
        setStep('ready');
      }, 3500); // 3.5s developing time
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleGenerate = () => {
    if (!guestName.trim()) {
        alert("Who are you? (Enter a name!)");
        return;
    }
    setStep('developing');
  };

  return (
    <div className="w-full min-h-dvh flex flex-col items-center justify-center p-4 relative">
      
      {/* Decorative BG */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none no-print">
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.1 }}
             transition={{ delay: 1 }}
             className="absolute top-10 right-10 w-40 h-40 text-black"
          >
              <SpiralDoodle />
          </motion.div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* STEP 1: PERSONALIZATION FORM */}
        {step === 'personalize' && (
            <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-white/50 backdrop-blur-sm p-6 sm:p-8 shadow-xl border border-white/50 rounded-sm relative z-10"
            >
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-black"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-pink-500"></div>

                <h2 className="font-hand text-5xl mb-8 text-center text-zinc-900">Make it yours</h2>
                
                <div className="space-y-8">
                    <div>
                        <label className="block font-mono text-sm font-bold uppercase tracking-widest mb-3 text-zinc-900">Who are you?</label>
                        <input 
                            type="text" 
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full bg-white border-b-4 border-zinc-200 focus:border-black outline-none px-2 py-3 font-scribble text-4xl placeholder:text-zinc-300 transition-colors text-zinc-900"
                            autoFocus
                        />
                    </div>

                    <div>
                         <label className="block font-mono text-sm font-bold uppercase tracking-widest mb-3 text-zinc-900">
                             Mugshot <span className="text-zinc-400 font-normal normal-case tracking-normal">(Optional)</span>
                         </label>
                         <CameraCapture onCapture={setCustomPhoto} />
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={!guestName.trim()}
                        className={cn(
                            "w-full bg-black text-white font-mono text-lg font-bold uppercase tracking-widest py-5 mt-6 transition-all hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg",
                            guestName.trim() ? "shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(236,72,153,1)]" : ""
                        )}
                    >
                        Generate Ticket
                    </button>
                    
                    <div className="text-center pt-2">
                         <button onClick={onBack} className="text-sm font-mono font-bold text-zinc-400 hover:text-black underline decoration-2 underline-offset-4">
                             Cancel
                         </button>
                    </div>
                </div>
            </motion.div>
        )}

        {/* STEP 2 & 3: POLAROID VIEW */}
        {(step === 'developing' || step === 'ready') && (
            <div className="flex flex-col items-center justify-center w-full">
                
                {/* Status Text */}
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="mb-8 text-center font-mono text-xs uppercase tracking-widest text-zinc-500 no-print"
                >
                    {step === 'developing' ? (
                        <span className="animate-pulse">Developing Ticket...</span>
                    ) : (
                        <span>Ticket Ready</span>
                    )}
                </motion.div>

                {/* The Polaroid */}
                <motion.div
                    key="polaroid"
                    initial={{ scale: 0.8, opacity: 0, rotate: -10, y: 100 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                    transition={{ type: "spring", duration: 1.5 }}
                    className="relative z-20 print-container"
                >
                    <Polaroid 
                        isDeveloping={step === 'developing'} 
                        guestName={guestName}
                        customPhotoUrl={customPhoto}
                    />
                </motion.div>

                {/* Actions (Only visible when ready) */}
                {step === 'ready' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col gap-4 items-center mt-12 z-20 no-print"
                    >
                        <button 
                            onClick={() => window.print()}
                            className="group relative inline-flex items-center justify-center gap-2 bg-zinc-900 text-white font-mono text-sm uppercase px-8 py-3 tracking-wider hover:bg-zinc-800 transition-colors shadow-lg"
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            Print Ticket
                        </button>

                        <button 
                            onClick={() => setStep('personalize')}
                            className="text-zinc-400 hover:text-zinc-600 font-hand text-lg underline decoration-wavy underline-offset-4 transition-colors"
                        >
                            ← Edit
                        </button>
                    </motion.div>
                )}
            </div>
        )}

      </AnimatePresence>
    </div>
  );
};