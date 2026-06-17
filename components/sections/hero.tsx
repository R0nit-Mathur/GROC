"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ZOOM_FRAMES } from "../../lib/frames";

// Register ScrollTrigger plugin safely for client execution
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGES = [
  { text: "Venture into the core of execution." },
  { text: "Deconstruct theories into raw experiments." },
  { text: "Pass through the portal of repetition." }
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webpRef = useRef<HTMLImageElement>(null);
  
  // Element refs for direct GSAP animation (bypassing React re-renders to prevent scroll lag)
  const entranceRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);

  // Indicators refs updated directly on scroll trigger ticks
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [fadeLoader, setFadeLoader] = useState(false);

  const loadedImagesRef = useRef<{ [key: number]: HTMLImageElement }>({});
  const totalFrames = ZOOM_FRAMES.length;
  const lastDrawnFrameRef = useRef<number>(-1);

  // State refs to track canvas zoom state without triggering React re-renders
  const frameObjRef = useRef({ frame: 0 });
  const currentStateRef = useRef<number>(0);

  // Fullscreen loader overlay fade-out and scroll release logic
  useEffect(() => {
    if (loadingProgress >= 100 && bgLoaded) {
      setFadeLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress, bgLoaded]);

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  // Preload looping WebP with safety timeout to prevent locking on slow connections
  useEffect(() => {
    const img = new Image();
    img.src = "/asset/GROC_landing_section.webp";
    
    const safetyTimeout = setTimeout(() => {
      setBgLoaded(true);
    }, 15000); // 15 seconds safety timeout

    img.onload = () => {
      clearTimeout(safetyTimeout);
      setBgLoaded(true);
    };
    img.onerror = () => {
      clearTimeout(safetyTimeout);
      setBgLoaded(true); // Fallback force load to let page display
    };

    return () => clearTimeout(safetyTimeout);
  }, []);

  // Entrance fade-in animation on mount when preloading completes
  useEffect(() => {
    if (!showLoader && entranceRef.current) {
      gsap.to(entranceRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      });
    }
  }, [showLoader]);

  // Handle Canvas Resizing (Optimized: runs only on resize events)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }
      lastDrawnFrameRef.current = -1; // Force redraw
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Progressive Zoom frame preloading with off-thread decoding optimization
  useEffect(() => {
    let active = true;
    
    // Step 1: Preload keyframes first (every 8th frame) to render basic scroll structure quickly
    const keyframeIndices: number[] = [];
    for (let i = 0; i < totalFrames; i += 8) {
      keyframeIndices.push(i);
    }
    if (!keyframeIndices.includes(totalFrames - 1)) {
      keyframeIndices.push(totalFrames - 1);
    }

    let loadedCount = 0;
    const updateProgress = () => {
      if (!active) return;
      loadedCount++;
      setLoadingProgress(Math.floor((loadedCount / totalFrames) * 100));
    };

    // Make sure frame 0 is loaded first and drawn immediately to prevent blank flashes
    const img0 = new Image();
    img0.src = `/asset/hero_zoom/${ZOOM_FRAMES[0]}`;
    img0.onload = () => {
      img0.decode().then(() => {
        if (!active) return;
        loadedImagesRef.current[0] = img0;
        updateProgress();
        drawFrame(0);
      }).catch(() => {
        if (!active) return;
        loadedImagesRef.current[0] = img0;
        updateProgress();
        drawFrame(0);
      });

      // Load remaining keyframes
      const keyframePromises = keyframeIndices.map((index) => {
        if (index === 0) return Promise.resolve();
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = `/asset/hero_zoom/${ZOOM_FRAMES[index]}`;
          img.onload = () => {
            img.decode().then(() => {
              if (active) {
                loadedImagesRef.current[index] = img;
                updateProgress();
              }
              resolve();
            }).catch(() => {
              if (active) {
                loadedImagesRef.current[index] = img;
                updateProgress();
              }
              resolve();
            });
          };
          img.onerror = () => {
            if (active) {
              updateProgress();
            }
            resolve();
          };
        });
      });

      Promise.all(keyframePromises).then(() => {
        if (!active) return;
        
        // Step 2: Load the rest in the background
        for (let i = 0; i < totalFrames; i++) {
          if (loadedImagesRef.current[i]) continue;

          const img = new Image();
          img.src = `/asset/hero_zoom/${ZOOM_FRAMES[i]}`;
          img.onload = () => {
            img.decode().then(() => {
              if (active) {
                loadedImagesRef.current[i] = img;
                updateProgress();
              }
            }).catch(() => {
              if (active) {
                loadedImagesRef.current[i] = img;
                updateProgress();
              }
            });
          };
          img.onerror = () => {
            if (active) {
              updateProgress();
            }
          };
        }
      });
    };

    return () => {
      active = false;
    };
  }, [totalFrames]);

  // Frame drawing helper
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (index === lastDrawnFrameRef.current) return;

    const getBestAvailableImage = (idx: number): HTMLImageElement | null => {
      if (loadedImagesRef.current[idx]) {
        return loadedImagesRef.current[idx];
      }
      let step = 1;
      while (step < totalFrames) {
        if (idx - step >= 0 && loadedImagesRef.current[idx - step]) {
          return loadedImagesRef.current[idx - step];
        }
        if (idx + step < totalFrames && loadedImagesRef.current[idx + step]) {
          return loadedImagesRef.current[idx + step];
        }
        step++;
      }
      return null;
    };

    const img = getBestAvailableImage(index);
    if (img) {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const rect = canvas.getBoundingClientRect();
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      lastDrawnFrameRef.current = index;
    }
  };

  // GSAP ScrollTrigger timeline configuration
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const entrance = entranceRef.current;
    const stage1 = stage1Ref.current;
    const stage2 = stage2Ref.current;
    const stage3 = stage3Ref.current;

    if (!container || !canvas || !entrance || !stage1 || !stage2 || !stage3) return;

    // Reset initial 3D transform and opacity states
    gsap.set(entrance, {
      rotationX: 0,
      y: 0,
      z: 0,
      opacity: 1,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden"
    });
    gsap.set([stage1, stage2, stage3], {
      opacity: 0,
      rotationX: 70,
      y: 100,
      z: -80,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden"
    });
    gsap.set(canvas, { opacity: 0 });
    if (webpRef.current) {
      gsap.set(webpRef.current, { opacity: 0.4 });
    }
    
    frameObjRef.current.frame = 0;
    currentStateRef.current = 0;
    drawFrame(0);

    // Dynamic state transition player to handle lag-free zoom snaps
    const transitionToState = (targetState: number) => {
      if (currentStateRef.current === targetState) return;
      currentStateRef.current = targetState;
      
      let targetFrame = 0;
      if (targetState === 1) targetFrame = 95;
      else if (targetState === 2) targetFrame = 140;
      else if (targetState === 3) targetFrame = 191;

      // Animate the frame index smoothly with a fast, snappy 0.8s transition
      gsap.to(frameObjRef.current, {
        frame: targetFrame,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
          drawFrame(Math.round(frameObjRef.current.frame));
        }
      });

      // Animate background loop and zoom canvas crossfade
      gsap.to(canvas, {
        opacity: targetState === 0 ? 0 : 1,
        duration: 0.4,
        overwrite: "auto"
      });
      
      if (webpRef.current) {
        gsap.to(webpRef.current, {
          opacity: targetState === 0 ? 0.4 : 0,
          duration: 0.4,
          overwrite: "auto"
        });
      }

      // Snappy 3D dice roll transition for all overlay texts (0.6s)
      const elements = [entrance, stage1, stage2, stage3];
      elements.forEach((el, i) => {
        if (!el) return;
        if (i === targetState) {
          // Roll IN and become active
          gsap.to(el, {
            rotationX: 0,
            y: 0,
            z: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
          });
        } else if (i < targetState) {
          // Outgoing or inactive above active: roll UP and out
          gsap.to(el, {
            rotationX: -70,
            y: -100,
            z: -80,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
          });
        } else {
          // Inactive below active: roll DOWN and out (waiting state)
          gsap.to(el, {
            rotationX: 70,
            y: 100,
            z: -80,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      });
    };

    // ScrollTrigger to detect which scroll sector the user is in (snapping state trigger)
    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        let targetState = 0;
        
        if (progress < 0.15) {
          targetState = 0;
        } else if (progress >= 0.15 && progress < 0.50) {
          targetState = 1;
        } else if (progress >= 0.50 && progress < 0.80) {
          targetState = 2;
        } else {
          targetState = 3;
        }

        // Update indicators directly on DOM refs to avoid React re-render lag
        const progressPercent = Math.floor(progress * 100);
        if (progressTextRef.current) {
          progressTextRef.current.textContent = `Portal Zoom ${progressPercent}%`;
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progressPercent}%`;
        }

        transitionToState(targetState);
      }
    });

    return () => {
      st.kill();
    };
  }, [bgLoaded]);

  const scrollToNext = () => {
    if (containerRef.current) {
      const startPos = containerRef.current.offsetTop;
      const totalHeight = containerRef.current.offsetHeight;
      // Scroll past 15% progress trigger to snap to State 1 zoom (around 25% height)
      window.scrollTo({
        top: startPos + totalHeight * 0.25,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Cinematic Fullscreen Preloader */}
      {showLoader && (
        <div
          className={`fixed inset-0 w-screen h-[100dvh] bg-[#050807] flex flex-col justify-center items-center z-[9999] transition-opacity duration-700 ease-out pointer-events-auto select-none ${
            fadeLoader ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Subtle forest pulse glow overlay */}
          <div className="absolute w-[70vw] h-[70vw] max-w-[600px] bg-brand-green/5 rounded-full blur-[140px] animate-pulse-slow" />

          {/* Loader text/bar box */}
          <div className="z-10 flex flex-col items-center max-w-sm w-full px-8 text-center font-mono">
            {/* Pulsing logo token */}
            <div className="w-12 h-12 rounded-xl bg-brand-green flex justify-center items-center font-bold text-black text-lg shadow-[0_0_35px_rgba(74,222,128,0.3)] mb-6 animate-pulse">
              G
            </div>

            {/* Display status */}
            <h2 className="text-sm font-bold text-white uppercase tracking-[0.3em] mb-1.5">
              INITIALIZING PORTAL
            </h2>
            <p className="text-[9px] text-[#4F625A] uppercase tracking-widest mb-8">
              System // Greater Repetition of Craft
            </p>

            {/* Premium Progress Bar */}
            <div className="w-full h-[2px] bg-zinc-950/80 rounded-full overflow-hidden mb-4 border border-[#111A17]">
              <div
                className="h-full bg-brand-green transition-all duration-300 ease-out shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                style={{ width: `${!bgLoaded && loadingProgress >= 100 ? 99 : loadingProgress}%` }}
              />
            </div>

            {/* Detailed metric details */}
            <div className="flex justify-between items-center w-full text-[9px] text-zinc-500 font-medium">
              <span className="animate-pulse uppercase tracking-wider">
                {!bgLoaded 
                  ? "Loading portal backdrop..." 
                  : loadingProgress < 100 
                    ? "Preloading story assets..." 
                    : "Engine initialized"}
              </span>
              <span className="font-bold text-brand-green">
                {!bgLoaded && loadingProgress >= 100 ? 99 : loadingProgress}%
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative h-[350vh] bg-dark-bg"
      >
      {/* Sticky Viewport Container */}
      <div 
        className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        
        {/* Layer 2 (Beneath): Zoom Scrubber Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-20"
          style={{ opacity: 0 }}
        />

        {/* Layer 1 (On top): Looping WebP faded background image (outside entranceRef to prevent rotation) */}
        {bgLoaded && (
          <img
            ref={webpRef}
            src="/asset/GROC_landing_section.webp"
            alt="GROC Animated Hero Background"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-10"
            style={{ opacity: 0.4 }}
          />
        )}

        {/* Ambient light pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[45vw] max-w-[900px] bg-brand-green/5 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />

        {/* Unified Entrance Fade Wrapper (for load entrance fade of landing elements) */}
        <div
          ref={entranceRef}
          className="absolute inset-0 w-full h-full flex flex-col justify-between items-center pointer-events-none"
          style={{ 
            opacity: 0,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        >
          {/* Top spacer */}
          <div className="w-full h-20 z-10" />

          {/* Unified Aligned Title Container */}
          <div 
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-6 z-10 flex flex-col items-center text-center pointer-events-none"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-black tracking-tight leading-none text-white select-none">
              <span className="bg-gradient-to-r from-white via-zinc-200 to-brand-green bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(34,197,94,0.25)]">
                Geek Room Open Code
              </span>
            </h1>
          </div>

          {/* Tagline, Description, Buttons, and Blinking Cue Container */}
          <div 
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-10 flex flex-col items-center text-center pointer-events-auto"
          >
            <p className="text-xs md:text-sm font-mono text-brand-green tracking-[0.3em] uppercase font-bold select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Greater Repetition of Craft
            </p>

            <p className="mt-3 text-xs md:text-sm text-zinc-300 leading-relaxed max-w-lg select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              A cinematic playground for open-source builders. Ship daily, deconstruct complex systems, and share your proof in public.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-4 items-center justify-center">
              <a
                href="#join"
                className="group relative px-6 py-2.5 rounded-full bg-brand-green text-black text-xs font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.03] shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                Join Ecosystem
              </a>
              <button
                onClick={scrollToNext}
                className="px-6 py-2.5 rounded-full border border-zinc-800 bg-zinc-950/60 hover:bg-zinc-900/60 text-zinc-300 hover:text-white text-xs font-medium backdrop-blur-sm transition-all duration-300 flex items-center gap-1.5 hover:border-zinc-700"
              >
                Explore Story
                <ArrowDown className="w-3 h-3 animate-bounce" />
              </button>
            </div>

            {/* Scroll to view content blinking in white */}
            <div className="mt-12 flex flex-col items-center gap-1.5 animate-pulse text-[10px] font-mono tracking-[0.25em] text-white uppercase select-none font-medium">
              <span>Scroll to view content</span>
            </div>
          </div>
        </div>

        {/* Storyboard Pauses Text Overlays (Managed directly by GSAP ScrollTrigger timeline) */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10" style={{ perspective: "1200px" }}>
          <div className="relative w-full max-w-4xl px-6 flex justify-center items-center h-full select-none" style={{ transformStyle: "preserve-3d" }}>
            {/* Stage 1 */}
            <div
              ref={stage1Ref}
              className="absolute text-center"
              style={{
                opacity: 0,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                {STAGES[0].text}
              </h2>
            </div>

            {/* Stage 2 */}
            <div
              ref={stage2Ref}
              className="absolute text-center"
              style={{
                opacity: 0,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                {STAGES[1].text}
              </h2>
            </div>

            {/* Stage 3 */}
            <div
              ref={stage3Ref}
              className="absolute text-center"
              style={{
                opacity: 0,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                {STAGES[2].text}
              </h2>
            </div>
          </div>
        </div>

        {/* Dynamic Scrubbing indicators */}
        <div className="absolute bottom-8 left-6 right-6 flex justify-between items-end z-10 select-none pointer-events-none">
          <div className="flex flex-col gap-1 font-mono text-[10px]">
            <span ref={progressTextRef} className="text-zinc-500 uppercase tracking-widest">
              Portal Zoom 0%
            </span>
            <div className="w-28 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-brand-green"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          {loadingProgress < 100 ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-black/60 border border-zinc-800 rounded-full font-mono text-[10px] text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-ping" />
              Preloading Portal: {loadingProgress}%
            </div>
          ) : (
            <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
              System // Compiled
            </span>
          )}
        </div>

      </div>
    </div>
    </>
  );
};
