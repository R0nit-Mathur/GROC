"use client";

import React from "react";
import { ExternalLink, Award, GitBranch, Database, FileText, Briefcase } from "lucide-react";
import { FadeIn } from "../motion/motion-primitives";

const ACCOMPLISHMENTS = [
  {
    icon: Database,
    category: "Systems Engineering",
    metric: "4.8k QPS",
    title: "AuraDB: LSM-Tree Storage Engine",
    description: "Built a persistent key-value store in Go utilizing Log-Structured Merge-trees. Implemented SSTable compaction, memtable write-ahead logging (WAL), and custom bloom filters for O(1) membership testing.",
    tags: ["Go", "Systems", "Bloom Filters", "Compaction"],
  },
  {
    icon: Award,
    category: "Hackathons",
    metric: "1st Place",
    title: "GasLight: EVM Fee Minimizer",
    description: "Developed a Solidity compiler optimizer at ETHDenver that statically analyzes smart contracts to restructure variable slots, reducing gas fees by 32% on contract deployment.",
    tags: ["Solidity", "ETHDenver", "Rust", "EVM"],
  },
  {
    icon: GitBranch,
    category: "Open Source",
    metric: "+12 Commits",
    title: "Next.js Compiler Optimization",
    description: "Contributed to Next.js Turbopack compiler. Optimized CSS module class name minification, reducing cold build bootstrap times by 400ms on large monorepos.",
    tags: ["Rust", "SWC", "Webpack", "Next.js"],
  },
  {
    icon: FileText,
    category: "Machine Learning",
    metric: "98.2% Acc",
    title: "EdgeLLM Quantization Research",
    description: "Co-authored research on custom 2-bit quantization strategies for deploying Llama-based models on ARM Cortex-M microcontrollers without thermal throttling.",
    tags: ["PyTorch", "Quantization", "C++", "Edge AI"],
  },
  {
    icon: Briefcase,
    category: "Internships",
    metric: "Linear QA",
    title: "Offline Sync Engine @ Linear",
    description: "Interned on the desktop client team. Refactored SQLite indexing structures, improving background synchronizations during volatile network dropouts.",
    tags: ["SQLite", "WebAssembly", "TypeScript", "IndexedDB"],
  },
];

export const ProofGrid: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 px-6 bg-env-primary border-b border-[#162722] overflow-hidden flex flex-col items-center">
      {/* Visual lighting accents */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] max-w-[500px] bg-env-green/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <FadeIn direction="up" delay={0.1}>
              <span className="font-mono text-xs text-env-green uppercase tracking-widest font-semibold">
                // proof of work
              </span>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className="mt-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-env-text-primary">
                We measure builders by what they deploy.
              </h2>
            </FadeIn>
          </div>
          <FadeIn direction="up" delay={0.3} className="text-env-text-secondary/50 font-mono text-xs md:text-sm shrink-0">
            NO FLUFF // REAL REPOS
          </FadeIn>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {/* Card 1: Main Large Card (Systems) - Spans 4 cols on desktop */}
          <FadeIn
            direction="up"
            delay={0.15}
            className="md:col-span-4 p-8 rounded-2xl border border-[#162722] bg-env-surface/40 backdrop-blur-sm flex flex-col justify-between group hover:border-env-green/40 hover:bg-env-surface hover:shadow-[0_4px_25px_rgba(74,222,128,0.06)] transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start font-mono text-[10px] text-env-text-secondary/50">
                <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                  <Database className="w-3.5 h-3.5 text-env-green" />
                  {ACCOMPLISHMENTS[0].category}
                </span>
                <span className="text-env-green bg-env-green/10 border border-env-green/20 px-2.5 py-0.5 rounded-full font-semibold">
                  {ACCOMPLISHMENTS[0].metric}
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-bold text-env-text-primary tracking-tight flex items-center gap-2 group-hover:text-env-green transition-colors">
                {ACCOMPLISHMENTS[0].title}
                <ExternalLink className="w-4 h-4 text-env-text-secondary/40 group-hover:text-env-green transition-colors" />
              </h3>
              <p className="mt-4 text-sm text-env-text-secondary leading-relaxed font-sans">
                {ACCOMPLISHMENTS[0].description}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {ACCOMPLISHMENTS[0].tags.map((t) => (
                <span key={t} className="font-mono text-[10px] text-env-text-secondary/60 bg-[#0B1210] border border-[#1C2C28] px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Card 2: Small Card (ETHDenver) - Spans 2 cols */}
          <FadeIn
            direction="up"
            delay={0.25}
            className="md:col-span-2 p-8 rounded-2xl border border-[#162722] bg-env-surface/40 backdrop-blur-sm flex flex-col justify-between group hover:border-env-green/40 hover:bg-env-surface hover:shadow-[0_4px_25px_rgba(74,222,128,0.06)] transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start font-mono text-[10px] text-env-text-secondary/50">
                <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                  <Award className="w-3.5 h-3.5 text-env-green" />
                  {ACCOMPLISHMENTS[1].category}
                </span>
                <span className="text-env-green bg-env-green/10 border border-env-green/20 px-2.5 py-0.5 rounded-full font-semibold">
                  {ACCOMPLISHMENTS[1].metric}
                </span>
              </div>
              <h3 className="mt-8 text-xl font-bold text-env-text-primary tracking-tight group-hover:text-env-green transition-colors">
                {ACCOMPLISHMENTS[1].title}
              </h3>
              <p className="mt-3 text-xs text-env-text-secondary leading-relaxed font-sans">
                {ACCOMPLISHMENTS[1].description}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-1.5">
              {ACCOMPLISHMENTS[1].tags.map((t) => (
                <span key={t} className="font-mono text-[9px] text-env-text-secondary/60 bg-[#0B1210] border border-[#1C2C28] px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Card 3: Small Card (NextJS) - Spans 2 cols */}
          <FadeIn
            direction="up"
            delay={0.3}
            className="md:col-span-2 p-8 rounded-2xl border border-[#162722] bg-env-surface/40 backdrop-blur-sm flex flex-col justify-between group hover:border-env-green/40 hover:bg-env-surface hover:shadow-[0_4px_25px_rgba(74,222,128,0.06)] transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start font-mono text-[10px] text-env-text-secondary/50">
                <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                  <GitBranch className="w-3.5 h-3.5 text-env-green" />
                  {ACCOMPLISHMENTS[2].category}
                </span>
                <span className="text-env-green bg-env-green/10 border border-env-green/20 px-2.5 py-0.5 rounded-full font-semibold">
                  {ACCOMPLISHMENTS[2].metric}
                </span>
              </div>
              <h3 className="mt-8 text-xl font-bold text-env-text-primary tracking-tight group-hover:text-env-green transition-colors">
                {ACCOMPLISHMENTS[2].title}
              </h3>
              <p className="mt-3 text-xs text-env-text-secondary leading-relaxed font-sans">
                {ACCOMPLISHMENTS[2].description}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-1.5">
              {ACCOMPLISHMENTS[2].tags.map((t) => (
                <span key={t} className="font-mono text-[9px] text-env-text-secondary/60 bg-[#0B1210] border border-[#1C2C28] px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Card 4: Main Large Card (ML Research) - Spans 4 cols */}
          <FadeIn
            direction="up"
            delay={0.4}
            className="md:col-span-4 p-8 rounded-2xl border border-[#162722] bg-env-surface/40 backdrop-blur-sm flex flex-col justify-between group hover:border-env-green/40 hover:bg-env-surface hover:shadow-[0_4px_25px_rgba(74,222,128,0.06)] transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start font-mono text-[10px] text-env-text-secondary/50">
                <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                  <FileText className="w-3.5 h-3.5 text-env-green" />
                  {ACCOMPLISHMENTS[3].category}
                </span>
                <span className="text-env-green bg-env-green/10 border border-env-green/20 px-2.5 py-0.5 rounded-full font-semibold">
                  {ACCOMPLISHMENTS[3].metric}
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-bold text-env-text-primary tracking-tight flex items-center gap-2 group-hover:text-env-green transition-colors">
                {ACCOMPLISHMENTS[3].title}
                <ExternalLink className="w-4 h-4 text-env-text-secondary/40 group-hover:text-env-green transition-colors" />
              </h3>
              <p className="mt-4 text-sm text-env-text-secondary leading-relaxed font-sans">
                {ACCOMPLISHMENTS[3].description}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {ACCOMPLISHMENTS[3].tags.map((t) => (
                <span key={t} className="font-mono text-[10px] text-env-text-secondary/60 bg-[#0B1210] border border-[#1C2C28] px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Card 5: Full Width Card (Linear Internship) - Spans 6 cols */}
          <FadeIn
            direction="up"
            delay={0.5}
            className="md:col-span-6 p-8 rounded-2xl border border-[#162722] bg-env-surface/40 backdrop-blur-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-env-green/40 hover:bg-env-surface hover:shadow-[0_4px_25px_rgba(74,222,128,0.06)] transition-all duration-300"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-[10px] text-env-text-secondary/50">
                <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                  <Briefcase className="w-3.5 h-3.5 text-env-green" />
                  {ACCOMPLISHMENTS[4].category}
                </span>
                <span className="text-env-green bg-env-green/10 border border-env-green/20 px-2.5 py-0.5 rounded-full font-semibold">
                  {ACCOMPLISHMENTS[4].metric}
                </span>
              </div>
              <h3 className="mt-6 text-xl md:text-2xl font-bold text-env-text-primary tracking-tight group-hover:text-env-green transition-colors">
                {ACCOMPLISHMENTS[4].title}
              </h3>
              <p className="mt-3 text-sm text-env-text-secondary leading-relaxed font-sans">
                {ACCOMPLISHMENTS[4].description}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 md:self-end">
              {ACCOMPLISHMENTS[4].tags.map((t) => (
                <span key={t} className="font-mono text-[10px] text-env-text-secondary/60 bg-[#0B1210] border border-[#1C2C28] px-2.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
