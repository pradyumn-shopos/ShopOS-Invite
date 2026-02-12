import React, { useRef, useEffect, useState } from 'react';
import { cn } from '../utils';

interface ScratchCardProps {
  width: number;
  height: number;
  children: React.ReactNode;
  className?: string;
  onReveal?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({ 
  width, 
  height, 
  children, 
  className,
  onReveal 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset composite operation to draw the cover
    ctx.globalCompositeOperation = 'source-over';

    // Fill with "Silver" scratch-off material
    ctx.fillStyle = '#C0C0C0'; 
    ctx.fillRect(0, 0, width, height);
    
    // Add noise/texture
    for (let i = 0; i < 400; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#A0A0A0' : '#E0E0E0';
        const size = Math.random() * 3 + 1;
        ctx.fillRect(Math.random() * width, Math.random() * height, size, size);
    }
    
    // Text
    ctx.fillStyle = '#666';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText("SCRATCH HERE", width/2, height/2);

  }, [width, height]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI); // Increased radius
    ctx.fill();
  };

  const checkReveal = () => {
      if (isRevealed) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Sample a grid of points
      const sampleStep = 10; 
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      let transparentCount = 0;
      let totalChecked = 0;

      for (let i = 0; i < data.length; i += 4 * sampleStep) {
          totalChecked++;
          if (data[i + 3] === 0) { // Alpha is 0
              transparentCount++;
          }
      }

      // If > 50% scratched
      if (transparentCount / totalChecked > 0.5) {
          setIsRevealed(true);
          onReveal?.();
          
          // Clear remaining
          ctx.clearRect(0, 0, width, height);
          
          // Hide canvas
          canvas.style.opacity = '0';
          setTimeout(() => {
             canvas.style.display = 'none';
          }, 500);
      }
  };

  // Handlers
  const handleMouseDown = (e: React.MouseEvent) => { setIsDrawing(true); scratch(e.clientX, e.clientY); };
  const handleMouseMove = (e: React.MouseEvent) => { if (isDrawing) scratch(e.clientX, e.clientY); };
  const handleMouseUp = () => { setIsDrawing(false); checkReveal(); };
  
  const handleTouchStart = (e: React.TouchEvent) => { setIsDrawing(true); scratch(e.touches[0].clientX, e.touches[0].clientY); };
  const handleTouchMove = (e: React.TouchEvent) => { if (isDrawing) scratch(e.touches[0].clientX, e.touches[0].clientY); };
  const handleTouchEnd = () => { setIsDrawing(false); checkReveal(); };

  return (
    <div 
        ref={containerRef}
        className={cn("relative overflow-hidden select-none transition-all", className)} 
        style={{ width, height }}
    >
      {/* The Secret Content */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-white border-2 border-dashed border-zinc-200">
        {children}
      </div>

      {/* The Scratch Layer */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="absolute inset-0 z-10 cursor-crosshair touch-none transition-opacity duration-500"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};
