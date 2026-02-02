import React from 'react';
import { motion } from 'motion/react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
            backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* Floating Blobs */}
      <motion.div 
        animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      
      <motion.div 
        animate={{ 
            y: [0, 30, 0],
            rotate: [0, -5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

       <motion.div 
        animate={{ 
            scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[30%] w-[20vw] h-[20vw] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
      />
    </div>
  );
};