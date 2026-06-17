"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent } from "framer-motion";

export const GrowthMorph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] bg-dark-bg"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        
        {/* ----------------- L2 LAYER (Base / Background) ----------------- */}
        <div className="absolute inset-0 w-full h-full flex flex-col justify-between items-center py-16 px-6 bg-dark-bg z-0">
          
          {/* L2 Background Image (Fullscreen, original, no filters) */}
          <Image
            src="/asset/GitHub_contribution_l2.jpeg"
            alt="Github Contribution Stage 2"
            fill
            className="object-cover -z-10"
            priority
          />

          {/* L2 Top Content */}
          <div className="w-full max-w-4xl flex flex-col items-center text-center select-none px-4">
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-brand-green/5 border border-brand-green/20 rounded-full mb-4 backdrop-blur-sm shadow-[0_0_15px_rgba(34,197,94,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
              <span className="font-mono text-[10px] text-brand-green tracking-widest uppercase font-semibold">
                STATUS // CONSISTENT
              </span>
            </div>

            <span className="font-mono text-xs text-brand-green uppercase tracking-widest">
              Day 365 // Shipped
            </span>

            <h3 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none mt-3">
              <span className="bg-gradient-to-r from-white via-zinc-200 to-brand-green bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(34,197,94,0.15)]">
                The Shipped Engine
              </span>
            </h3>

          </div>

          {/* L2 Bottom Content */}
          <div className="w-full max-w-4xl flex flex-col items-center text-center select-none px-4">
            
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Verifiable proof-of-work. Over 1,200 commits in public, production-grade architectures deployed, and pipelines passing. A testament to developer consistency that makes talent discovery inevitable.
            </p>

            {/* Horizontal Specs Bar */}
            <div className="mt-8 w-full max-w-3xl grid grid-cols-3 gap-4 border-t border-b border-zinc-900/80 py-5 font-mono text-[10px] md:text-xs text-zinc-500">
              <div className="flex flex-col gap-1 items-center">
                <span className="text-zinc-600 uppercase tracking-wider text-[9px] md:text-[10px]">Init Date</span>
                <span className="text-brand-green/80 text-xs md:text-sm font-semibold">2025-06-17</span>
              </div>
              <div className="flex flex-col gap-1 items-center border-l border-r border-zinc-900/80">
                <span className="text-zinc-600 uppercase tracking-wider text-[9px] md:text-[10px]">Commit Freq</span>
                <span className="text-brand-green/80 text-xs md:text-sm font-semibold">3.42/day</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-zinc-600 uppercase tracking-wider text-[9px] md:text-[10px]">Build Status</span>
                <span className="text-brand-green text-xs md:text-sm font-bold uppercase shadow-[0_0_8px_rgba(34,197,94,0.3)]">Successful</span>
              </div>
            </div>

            {/* Bottom center narrative message */}
            <div className="mt-6 text-center select-none">
              <span className="font-mono text-xs text-brand-green bg-brand-green/10 border border-brand-green/20 px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                // Not smarter. Just shipped more.
              </span>
            </div>

          </div>

        </div>

        {/* ----------------- L1 LAYER (Top / Cropped) ----------------- */}
        <div 
          className="absolute inset-0 w-full h-full flex flex-col justify-between items-center py-16 px-6 bg-dark-bg z-10"
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% ${100 - scrollProgress * 100}%, 0 ${100 - scrollProgress * 100}%)`,
          }}
        >
          
          {/* L1 Background Image (Fullscreen, original, no filters) */}
          <Image
            src="/asset/GitHub_contribution_l1.jpeg"
            alt="Github Contribution Stage 1"
            fill
            className="object-cover -z-10"
            priority
          />

          {/* L1 Top Content */}
          <div className="w-full max-w-4xl flex flex-col items-center text-center select-none px-4">
            
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/40 border border-zinc-800/80 rounded-full mb-4 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
              <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase font-semibold">
                STATUS // CURIOUS
              </span>
            </div>

            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              Day 01 // Beginnings
            </span>

            <h3 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none mt-3">
              The Blank Canvas
            </h3>

          </div>

          {/* L1 Bottom Content */}
          <div className="w-full max-w-4xl flex flex-col items-center text-center select-none px-4">
            
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl font-sans drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              The entry point. Initializing a local repository, exploring dependencies, and formulating ideas. Every builder starts as an empty grid—curiosity waiting to be compiled into verified contribution.
            </p>

            {/* Horizontal Specs Bar */}
            <div className="mt-8 w-full max-w-3xl grid grid-cols-3 gap-4 border-t border-b border-zinc-900 py-5 font-mono text-[10px] md:text-xs text-zinc-500">
              <div className="flex flex-col gap-1 items-center">
                <span className="text-zinc-600 uppercase tracking-wider text-[9px] md:text-[10px]">Init Date</span>
                <span className="text-zinc-300 text-xs md:text-sm font-semibold">2025-06-17</span>
              </div>
              <div className="flex flex-col gap-1 items-center border-l border-r border-zinc-900">
                <span className="text-zinc-600 uppercase tracking-wider text-[9px] md:text-[10px]">Commit Freq</span>
                <span className="text-zinc-300 text-xs md:text-sm font-semibold">0.00/day</span>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <span className="text-zinc-600 uppercase tracking-wider text-[9px] md:text-[10px]">Build Status</span>
                <span className="text-zinc-300 text-xs md:text-sm font-semibold uppercase">Uncompiled</span>
              </div>
            </div>

            {/* Bottom center narrative message */}
            <div className="mt-6 text-center select-none">
              <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest animate-pulse">
                Scroll to progress history timeline
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
