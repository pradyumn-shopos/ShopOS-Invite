import React, { useState } from 'react';
import { LandingView } from './components/LandingView';
import { TicketView } from './components/TicketView';
import { Background } from './components/Background';
import { ViewState } from './types';
import { AnimatePresence, motion } from 'motion/react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('landing');

  return (
    <main className="relative w-full min-h-dvh overflow-hidden bg-[#FDFBF7] text-zinc-900 selection:bg-pink-200">
      <Background />
      
      <AnimatePresence mode="wait">
        {viewState === 'landing' ? (
          <motion.div 
            key="landing"
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <LandingView onYes={() => setViewState('ticket')} />
          </motion.div>
        ) : (
          <motion.div 
            key="ticket"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full overflow-y-auto"
          >
             <TicketView onBack={() => setViewState('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;