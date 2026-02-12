import React, { useState } from 'react';
import { LandingView } from './components/LandingView';
import { TicketView } from './components/TicketView';
import { EnvelopeView } from './components/EnvelopeView';
import { ConfirmationView } from './components/ConfirmationView';
import { Background } from './components/Background';
import { CassettePlayer } from './components/CassettePlayer';
import { ViewState } from './types';
import { AnimatePresence, motion } from 'motion/react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('envelope');

  return (
    <main className="relative w-full min-h-dvh overflow-hidden bg-[#FDFBF7] text-zinc-900 selection:bg-pink-200">
      <Background />
      <CassettePlayer />
      
      <AnimatePresence mode="wait">
        {viewState === 'envelope' && (
           <motion.div
             key="envelope"
             exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
             transition={{ duration: 0.8 }}
             className="absolute inset-0 w-full h-full z-50 bg-[#FDFBF7]"
           >
              <EnvelopeView onOpen={() => setViewState('confirmation')} />
           </motion.div>
        )}

        {viewState === 'confirmation' && (
          <motion.div 
            key="confirmation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full z-50 overflow-hidden" // Increased z-index to 50
          >
            <ConfirmationView onCreateBadge={() => setViewState('ticket')} />
          </motion.div>
        )}
        
        {viewState === 'ticket' && (
          <motion.div 
            key="ticket"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full overflow-y-auto z-30"
          >
             <TicketView onBack={() => setViewState('confirmation')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;