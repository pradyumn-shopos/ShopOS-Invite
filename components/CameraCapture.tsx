import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';

interface CameraCaptureProps {
  onCapture: (imageData: string | null) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      // Cleanup stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Countdown Logic
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      takePhoto();
      setCountdown(null);
    }
  }, [countdown]);

  // Callback ref to handle video element mounting inside AnimatePresence
  const onVideoMount = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node && stream) {
      node.srcObject = stream;
    }
  }, [stream]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCapturedImage(e.target.result as string);
          onCapture(e.target.result as string);
          stopCamera(); // Stop camera if running
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false
      });
      setStream(mediaStream);
      setIsActive(true);
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera access denied or unavailable.");
    }
  };

  const startCountdown = () => {
    setCountdown(3);
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Square crop logic
        const size = Math.min(video.videoWidth, video.videoHeight);
        canvas.width = size;
        canvas.height = size;
        const startX = (video.videoWidth - size) / 2;
        const startY = (video.videoHeight - size) / 2;

        context.drawImage(video, startX, startY, size, size, 0, 0, size, size);
        
        // Add some "Polaroid" filter effects via canvas operations if we wanted, 
        // but simple contrast is easier with CSS on display.
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(dataUrl);
        onCapture(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsActive(false);
  };

  const clearPhoto = () => {
    setCapturedImage(null);
    onCapture(null);
  };

  return (
    <div className="w-full max-w-[320px] mx-auto bg-white p-3 shadow-md rotate-1 border border-zinc-200">
      <div className="relative aspect-square bg-zinc-100 overflow-hidden mb-3 border border-zinc-200">
        <AnimatePresence mode="wait">
          {capturedImage ? (
            <motion.img 
              key="captured"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={capturedImage} 
              className="w-full h-full object-cover grayscale contrast-125 sepia-[0.3]" 
              alt="Captured"
            />
          ) : isActive ? (
            <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative">
              <video 
                ref={onVideoMount} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover mirror-mode" 
                style={{ transform: 'scaleX(-1)' }}
              />
              
              {/* Countdown Overlay */}
              <AnimatePresence>
                {countdown !== null && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    key={countdown}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span className="font-hand text-8xl text-white drop-shadow-md">
                      {countdown > 0 ? countdown : "CHEESE!"}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
             <motion.div 
               key="placeholder"
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="w-full h-full flex flex-col items-center justify-center text-zinc-400 bg-zinc-50"
             >
                {error ? (
                   <span className="text-xs text-red-400 text-center px-4">{error}</span>
                ) : (
                   <svg className="w-12 h-12 mb-2 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                )}
                <span className="font-mono text-xs text-center px-4">
                    {error ? "Maybe next time." : "No photo selected"}
                </span>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden Canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept="image/*" 
            className="hidden" 
        />
      </div>

      <div className="flex gap-2 justify-center">
        {!capturedImage && !isActive && (
             <>
                <button 
                    onClick={startCamera}
                    className="flex-1 bg-zinc-900 text-white font-mono text-xs uppercase py-3 hover:bg-zinc-700 transition-colors"
                >
                    Camera
                </button>
                <button 
                    onClick={triggerFileUpload}
                    className="flex-1 bg-white border border-zinc-900 text-zinc-900 font-mono text-xs uppercase py-3 hover:bg-zinc-100 transition-colors"
                >
                    Upload
                </button>
             </>
        )}
        
        {isActive && (
            <button 
                onClick={startCountdown}
                disabled={countdown !== null}
                className="flex-1 bg-red-600 text-white font-mono text-xs uppercase py-2 hover:bg-red-700 transition-colors disabled:opacity-50"
            >
                {countdown !== null ? "Get Ready..." : "Ready?"}
            </button>
        )}

        {capturedImage && (
            <button 
                onClick={clearPhoto}
                className="flex-1 border border-zinc-300 text-zinc-600 font-mono text-xs uppercase py-2 hover:bg-zinc-50 transition-colors"
            >
                Retake
            </button>
        )}
      </div>
    </div>
  );
};