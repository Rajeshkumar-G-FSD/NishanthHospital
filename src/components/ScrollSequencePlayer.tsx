import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, HelpCircle, Heart, Star, Sparkles, Calendar, Shield, Activity, RefreshCw } from 'lucide-react';

interface ScrollSequencePlayerProps {
  onOpenBooking: () => void;
}

export default function ScrollSequencePlayer({ onOpenBooking }: ScrollSequencePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loading & preloading state
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const TOTAL_FRAMES = 151;
  const imageCache = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(1);
  const targetFrame = useRef(1);
  const animationRef = useRef<number | null>(null);

  // Generate frame source URL
  const getFrameUrl = (index: number): string => {
    const paddedIndex = String(index).padStart(3, '0');
    return `/frames/ezgif-frame-${paddedIndex}.jpg`;
  };

  // Preload all 151 images
  useEffect(() => {
    let loaded = 0;
    const imagesToLoad: HTMLImageElement[] = [];

    // Prioritize frame 1 to draw it instantly
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      imageCache.current[1] = firstImg;
      loaded++;
      setLoadedCount(1);
      drawFrame(1); // Draw initial frame immediately
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      if (i === 1) continue; // Already loaded

      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        imageCache.current[i] = img;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsPreloading(false);
        }
      };
      
      // If an error occurs, fallback gracefully so progress keeps tracking
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsPreloading(false);
        }
      };
      imagesToLoad.push(img);
    }

    return () => {
      // Clean up preloading if component unmounts
      imagesToLoad.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  // Canvas Responsive Resizing (supports Retina screens)
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawFrame(Math.round(currentFrame.current));
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loadedCount]); // Trigger on frame load so sizing updates

  // Core drawing algorithm with object-fit: cover mapping
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Secure fallback: find the closest preloaded frame if this index isn't ready
    let img = imageCache.current[frameIndex];
    if (!img || !img.complete) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const fallbackLower = Math.max(1, frameIndex - offset);
        const fallbackHigher = Math.min(TOTAL_FRAMES, frameIndex + offset);
        if (imageCache.current[fallbackLower]?.complete) {
          img = imageCache.current[fallbackLower];
          break;
        }
        if (imageCache.current[fallbackHigher]?.complete) {
          img = imageCache.current[fallbackHigher];
          break;
        }
      }
    }

    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    // Aspect ratio calculation matching background-size: cover
    if (imgRatio > canvasRatio) {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Scroll position listener mapping window scroll bound -> frame index
  const handleScroll = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // total scroll depth of section
    const scrollBoxHeight = rect.height - window.innerHeight;
    const scrolledOffset = -rect.top;
    
    let progress = scrolledOffset / scrollBoxHeight;
    progress = Math.max(0, Math.min(1, progress));
    
    setScrollProgress(progress);
    targetFrame.current = 1 + Math.round(progress * (TOTAL_FRAMES - 1));
  };

  // lerped momentum loop for smooth transition transitions on direct/quick scrolls
  useEffect(() => {
    const animate = () => {
      const diff = targetFrame.current - currentFrame.current;
      if (Math.abs(diff) > 0.05) {
        currentFrame.current += diff * 0.15; // Smooth multiplier speed (lerp coeff)
        drawFrame(Math.round(currentFrame.current));
      } else if (currentFrame.current !== targetFrame.current) {
        currentFrame.current = targetFrame.current;
        drawFrame(currentFrame.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const progressPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] bg-slate-900" id="scroll-sequence-scroller">
      
      {/* Sticky screen container to host the visual player */}
      <div className="sticky top-0 left-0 right-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">
        
        {/* Cinematic dark overlays to balance content readability */}
        <div className="absolute inset-0 bg-radial-gradient(circle at center, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.5) 100%) z-10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-slate-950/80 to-transparent z-15 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-56 h-40 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent z-15 pointer-events-none md:block hidden" />
        
        {/* The Animated Canvas Base */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover text-white filter brightness-95 opacity-85 transition-opacity duration-300 pointer-events-none"
          id="scroll-render-canvas"
        />



        {/* Loading overlay panel for smooth asset boot */}
        {isPreloading && (
          <div className="absolute inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6 text-center" id="sequence-preloader">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xs space-y-5"
            >
              <div className="relative inline-flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-rose-500 animate-spin" />
                <Heart className="absolute w-6 h-6 text-rose-500 fill-rose-500/20 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-white text-lg font-bold">Immersive Care Sequence</h4>
                <p className="text-slate-500 text-xs font-sans">Assembling our interactive delivery cinematic experience...</p>
              </div>

              {/* Progress Bar container */}
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-rose-500 to-amber-500 transition-all duration-100 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-widest">
                <span>Buffering Assets</span>
                <span>{progressPercentage}%</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* CONTENT PANELS SYNCHRONIZED TO SCROLL MILESTONES */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12 pointer-events-none">
          <div className="max-w-7xl mx-auto w-full flex items-center h-full relative">
            
            {/* Left Content column: text messages fade in/out selectively as scroll advances */}
            <div className="max-w-xl md:max-w-2xl relative flex flex-col justify-center min-h-[50vh] text-left">
              
              {/* STAGE A CONTENT (scrollProgress 0% to 33%) */}
              <AnimatePresence mode="wait">
                {scrollProgress >= 0 && scrollProgress < 0.33 && (
                  <motion.div
                    key="stage-a"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-auto"
                  >
                   

                   

                  

                  

                
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE B CONTENT (scrollProgress 33% to 66%) */}
              <AnimatePresence mode="wait">
                {scrollProgress >= 0.33 && scrollProgress < 0.66 && (
                  <motion.div
                    key="stage-b"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-auto"
                  >
                  
                 
                   
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STAGE C CONTENT (scrollProgress 66% to 100%) */}
              <AnimatePresence mode="wait">
                {scrollProgress >= 0.66 && (
                  <motion.div
                    key="stage-c"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col justify-center pointer-events-auto"
                  >
                  
                  

                    {/* Integrated mini CTA button */}
                   
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
