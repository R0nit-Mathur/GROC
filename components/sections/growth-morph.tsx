"use client";

import React, { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { Terminal } from "lucide-react";

const COLUMNS = 53;
const ROWS = 7;
const CELL_SIZE = 18;
const GAP = 4;
const STEP = CELL_SIZE + GAP; // 22

// Generate deterministic level arrays to avoid recalculating on every render
const generateGridData = (active: boolean) => {
  const cells = [];
  for (let c = 0; c < COLUMNS; c++) {
    for (let r = 0; r < ROWS; r++) {
      const index = c * ROWS + r;
      let level = 0;
      
      if (active) {
        // Active Day 365 pattern: groups/sprints of high activity
        const isSprintPeriod = 
          (c >= 4 && c <= 9) || 
          (c >= 14 && c <= 21) || 
          (c >= 28 && c <= 36) || 
          (c >= 42 && c <= 49);
        
        if (isSprintPeriod) {
          const score = (index * 17) % 100;
          if (score < 15) level = 0;
          else if (score < 40) level = 1;
          else if (score < 70) level = 2;
          else if (score < 90) level = 3;
          else level = 4;
        } else {
          const score = (index * 23) % 100;
          if (score < 60) level = 0;
          else if (score < 80) level = 1;
          else level = 2;
        }
      } else {
        // Day 01 - empty canvas with just 3 minor early commits (initialization phase)
        if (index === 15 || index === 84 || index === 210) {
          level = 1;
        }
      }

      cells.push({
        x: c * STEP,
        y: r * STEP,
        level,
      });
    }
  }
  return cells;
};

const L1_CELLS = generateGridData(false);
const L2_CELLS = generateGridData(true);

interface ContributionGraphCardProps {
  active: boolean;
  cells: typeof L1_CELLS;
}

const ContributionGraphCard: React.FC<ContributionGraphCardProps> = ({ active, cells }) => {
  return (
    <div className="w-full max-w-5xl px-8 py-6 rounded-2xl border border-[#17231c]/60 bg-[#0c120f]/50 backdrop-blur-md flex flex-col gap-4 shadow-[0_4px_30px_rgba(0,0,0,0.8)] my-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#17231c]/50 pb-2.5 text-zinc-500 font-mono text-[9px] md:text-[10px] select-none">
        <span className="flex items-center gap-1.5 uppercase font-bold text-zinc-400">
          <Terminal className="w-3.5 h-3.5 text-brand-green" />
          groc-pipeline // contribution-graph
        </span>
        <span className={active ? "text-brand-green font-bold animate-pulse" : "text-zinc-600"}>
          {active ? "STATUS: SHIPPED" : "STATUS: UNCOMPILED"}
        </span>
      </div>
      
      {/* SVG grid */}
      <div className="w-full overflow-x-auto py-1 scrollbar-none">
        <svg 
          viewBox={`0 0 ${COLUMNS * STEP - GAP} ${ROWS * STEP - GAP}`} // 0 0 1162 150
          className="w-full h-auto text-zinc-900"
          style={{ minWidth: "750px" }}
        >
          {cells.map((cell, idx) => {
            let fill = "#111815";
            let opacity = 0.8;
            
            if (cell.level === 1) {
              fill = "var(--brand-green)";
              opacity = 0.15;
            } else if (cell.level === 2) {
              fill = "var(--brand-green)";
              opacity = 0.40;
            } else if (cell.level === 3) {
              fill = "var(--brand-green)";
              opacity = 0.70;
            } else if (cell.level === 4) {
              fill = "var(--brand-green)";
              opacity = 1.0;
            }

            return (
              <rect
                key={idx}
                x={cell.x}
                y={cell.y}
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx="3"
                ry="3"
                style={{ fill, fillOpacity: opacity }}
                className="transition-all duration-300 hover:scale-[1.08] transform origin-center"
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex justify-between items-center font-mono text-[8px] md:text-[9px] text-zinc-600 select-none">
        <span>VERIFIABLE COMMITS METRIC</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: "#111815", opacity: 0.8 }} />
          <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: "var(--brand-green)", opacity: 0.15 }} />
          <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: "var(--brand-green)", opacity: 0.4 }} />
          <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: "var(--brand-green)", opacity: 0.7 }} />
          <div className="w-2.5 h-2.5 rounded-[2px]" style={{ backgroundColor: "var(--brand-green)", opacity: 1.0 }} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

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

          {/* New Coded GitHub Graph Card (Active) */}
          <ContributionGraphCard active={true} cells={L2_CELLS} />

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

          {/* New Coded GitHub Graph Card (Sparse/Day 01) */}
          <ContributionGraphCard active={false} cells={L1_CELLS} />

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
