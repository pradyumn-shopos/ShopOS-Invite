import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import { NO_BUTTON_PHRASES } from '../constants';
import { getRandomItem, getRandomInt } from '../utils';

export const RunawayButton: React.FC = () => {
  const [text, setText] = useState("NO");
  const controls = useAnimation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [attempts, setAttempts] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial Position - Place it cheekily next to the center (where YES button is)
  useEffect(() => {
    // (0,0) is the center of the screen due to top-1/2 left-1/2
    // We want to offset it.
    // Desktop: ~160px right. Mobile: ~100px down.
    const startX = isMobile ? 0 : 160;
    const startY = isMobile ? 120 : 0;
    
    controls.set({ x: startX, y: startY });
  }, [isMobile, controls]);

  const moveButton = () => {
    // If the button ref isn't ready, we can't measure it, so we skip
    if (!containerRef.current) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    
    // We estimate button dimensions if we can't measure immediately, but ref should be there.
    // Using explicit safety margins.
    const btnW = 140; // Approx width
    const btnH = 60;  // Approx height
    const padding = 40; // Safe distance from screen edge

    // The container is anchored at top:50%, left:50% (screen center).
    // The bounds for 'x' and 'y' need to keep the element fully on screen.
    // x goes from left-edge to right-edge relative to center.
    // Left edge of screen relative to center is -vw/2.
    // Right edge is vw/2.
    
    // We want the CENTER of the button to be within safe bounds.
    // Actually, framer motion transforms the element. 
    // If we assume the element is centered at (0,0) inside the wrapper...
    // Let's keep it simple: Calculate random position within the safe rectangle.

    const minX = -(vw / 2) + padding + (btnW / 2);
    const maxX = (vw / 2) - padding - (btnW / 2);
    const minY = -(vh / 2) + padding + (btnH / 2);
    const maxY = (vh / 2) - padding - (btnH / 2);

    let newX = getRandomInt(minX, maxX);
    let newY = getRandomInt(minY, maxY);

    // Make sure we don't accidentally land back on the center (where YES is)
    // "Center Safe Zone"
    const centerSafeZone = isMobile ? 80 : 140;
    if (Math.abs(newX) < centerSafeZone && Math.abs(newY) < centerSafeZone) {
        // Bump it out
        if (Math.random() > 0.5) {
            newX = newX > 0 ? newX + 100 : newX - 100;
        } else {
            newY = newY > 0 ? newY + 100 : newY - 100;
        }
    }
    
    // Additional clamp just in case
    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));

    // Update text playfully
    const newText = attempts < 1 ? "NO" : getRandomItem(NO_BUTTON_PHRASES);
    setText(newText);
    setAttempts(prev => prev + 1);

    // Animate
    controls.start({
      x: newX,
      y: newY,
      rotate: getRandomInt(-10, 10),
      scale: 1.1, // Pulse up briefly
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 20,
        mass: 0.8 
      }
    }).then(() => {
        controls.start({ scale: 1, transition: { duration: 0.2 } });
    });
  };

  return (
    <motion.div
      ref={containerRef}
      animate={controls}
      className="fixed top-1/2 left-1/2 z-50 flex items-center justify-center pointer-events-auto touch-none"
      // touch-none prevents scrolling while trying to tap this button
      style={{ marginLeft: '-70px', marginTop: '-25px' }} // Approximate centering of the button itself on the anchor
    >
      <div 
         // Helper wrapper to catch events
         className="p-4" // Invisible padding to make the "run away" trigger area slightly larger
         onMouseEnter={moveButton}
         onTouchStart={(e) => { e.preventDefault(); moveButton(); }}
      >
          <button
            ref={buttonRef}
            tabIndex={-1} // Remove from keyboard tab order to be extra cheeky
            className="bg-zinc-200/80 backdrop-blur-sm text-zinc-500 font-mono text-sm px-6 py-3 rounded-sm shadow-sm uppercase tracking-widest whitespace-nowrap border border-zinc-300/50 cursor-pointer select-none transition-colors"
          >
            {text}
          </button>
      </div>
    </motion.div>
  );
};