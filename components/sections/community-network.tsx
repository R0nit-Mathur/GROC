"use client";

import React, { useState, useEffect, useRef } from "react";
import { Code, GitBranch, Terminal, CheckCircle2, User, GitPullRequest, Eye } from "lucide-react";
import { useInView } from "framer-motion";
import { FadeIn } from "../motion/motion-primitives";

interface CommitNode {
  id: number;
  sha: string;
  author: string;
  role: string;
  branch: string;
  cx: number; // x coordinate in % (relative to 100 viewBox)
  cy: number; // y coordinate in % (relative to 100 viewBox)
  msg: string;
  additions: number;
  deletions: number;
  status: "success" | "pending" | "merged";
  date: string;
}

const COMMITS_DATA: CommitNode[] = [
  { id: 1, sha: "ef7102a", author: "Tariq", role: "Cohort Curator", branch: "main", cx: 10, cy: 20, msg: "curate: initial project scaffolding with test suites", additions: 42, deletions: 0, status: "success", date: "2 mins ago" },
  { id: 2, sha: "a91b24d", author: "Elena", role: "Module Lead", branch: "dev", cx: 24, cy: 40, msg: "feat(core): setup concurrent packet buffer pool", additions: 154, deletions: 12, status: "success", date: "5 mins ago" },
  { id: 3, sha: "cb782e1", author: "Kaelen", role: "Ecosystem Curator", branch: "feature/compiler", cx: 36, cy: 60, msg: "curate: approve AST parser module contributions", additions: 89, deletions: 4, status: "merged", date: "10 mins ago" },
  { id: 4, sha: "8d904b1", author: "Chloe", role: "Lead Contributor", branch: "feature/compiler", cx: 46, cy: 60, msg: "feat(compiler): recursive AST compiler pass", additions: 64, deletions: 15, status: "merged", date: "12 mins ago" },
  { id: 5, sha: "c52e1f4", author: "Sophia", role: "Active Builder", branch: "dev", cx: 40, cy: 40, msg: "feat(render): WebGL canvas layer interface", additions: 112, deletions: 8, status: "success", date: "15 mins ago" },
  { id: 6, sha: "e7f22a1", author: "Aravind", role: "Technical Curator", branch: "feature/ui-engine", cx: 52, cy: 80, msg: "curate: approve multi-threaded lock-free queue", additions: 240, deletions: 18, status: "merged", date: "20 mins ago" },
  { id: 7, sha: "9b8df32", author: "Sophia", role: "Active Builder", branch: "feature/ui-engine", cx: 62, cy: 80, msg: "feat(render): shader compilation pipeline", additions: 95, deletions: 2, status: "merged", date: "22 mins ago" },
  { id: 8, sha: "14be0c2", author: "Ji-Min", role: "Project Contributor", branch: "dev", cx: 68, cy: 40, msg: "merge(core): integrate optimized memory buffers", additions: 350, deletions: 24, status: "success", date: "25 mins ago" },
  { id: 9, sha: "3a4f89d", author: "Marcus", role: "Curator Lead", branch: "dev", cx: 78, cy: 40, msg: "curate: merge rendering pipeline for dev check", additions: 420, deletions: 35, status: "success", date: "30 mins ago" },
  { id: 10, sha: "7f21e8a", author: "Tariq", role: "Cohort Curator", branch: "main", cx: 92, cy: 20, msg: "release(v1.0.0): deploy stable builder core to production", additions: 15, deletions: 2, status: "success", date: "32 mins ago" }
];

const INITIAL_LOGS = [
  "system: initializing repository curation agent listener...",
  "groc: listener active on main, dev, feature/*",
  "* [main] sha ef7102a - Tariq (Curator): setup project boundary limits (+42 -0)",
  "* [dev] sha a91b24d - Elena (Contributor): feat(core): concurrent thread-safe queues (+154 -12)",
  "* [feature/compiler] sha cb782e1 - Kaelen (Curator): curate: approve compiler tokenization specs (+89 -4)"
];

const RANDOM_LOG_TEMPLATES = [
  { author: "Kaelen (Curator)", branch: "feature/compiler", msg: "curate: approve AST parser module contributions", add: 14, del: 3 },
  { author: "Sophia (Builder)", branch: "dev", msg: "feat(render): WebGL canvas layer interface", add: 5, del: 1 },
  { author: "Elena (Builder)", branch: "dev", msg: "fix(core): thread safety boundary validation check", add: 2, del: 2 },
  { author: "Marcus (Curator)", branch: "dev", msg: "curate: merge compiler optimization pull requests", add: 58, del: 12 },
  { author: "Chloe (Builder)", branch: "feature/ui-engine", msg: "feat(render): shader compilation pipeline", add: 12, del: 0 },
  { author: "Tariq (Curator)", branch: "main", msg: "release(v1.0.2): tag stable module build on main", add: 8, del: 1 },
  { author: "Aravind (Curator)", branch: "feature/compiler", msg: "curate: approve multi-threaded lock-free queue", add: 32, del: 6 }
];

export const CommunityNetwork: React.FC = () => {
  const [hoveredCommit, setHoveredCommit] = useState<CommitNode | null>(null);
  const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track if section is in viewport to suspend expensive SVG animations
  const isGraphInView = useInView(containerRef, { once: false, margin: "-10% 0px" });

  // Auto-scroll terminal container directly (fixes viewport scroll hijacking)
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Simulate incoming live commits to the terminal
  useEffect(() => {
    const interval = setInterval(() => {
      const template = RANDOM_LOG_TEMPLATES[Math.floor(Math.random() * RANDOM_LOG_TEMPLATES.length)];
      const randomSha = Math.random().toString(16).substring(2, 9);
      const newLog = `* [${template.branch}] sha ${randomSha} - ${template.author}: ${template.msg} (+${template.add} -${template.del})`;
      setLogs((prev) => [...prev.slice(-14), newLog]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} id="network" className="relative py-28 md:py-36 px-6 bg-env-secondary overflow-hidden flex flex-col items-center">
      {/* Subtle blue gradient connection glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 z-10">
          <FadeIn direction="up" delay={0.1}>
            <span className="font-mono text-xs text-env-blue uppercase tracking-widest font-semibold">
              // builder network
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} className="mt-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-env-text-primary max-w-3xl mx-auto leading-tight">
              You aren&apos;t joining another Discord.
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.3} className="mt-4 max-w-2xl mx-auto text-env-text-secondary">
            You&apos;re joining a network of builders who ship code, solve hard engineering problems, and help each other deploy.
          </FadeIn>
        </div>

        {/* Dynamic Branching Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full z-10">
          
          {/* SVG Commit Graph Card (Spans 2 columns) */}
          <FadeIn direction="up" delay={0.4} className="lg:col-span-2 relative">
            <div className="relative w-full h-[360px] md:h-[420px] lg:h-[480px] rounded-2xl border border-[#1C2C28] bg-env-surface/50 backdrop-blur-md overflow-hidden select-none flex flex-col justify-between p-6">
              
              {/* Header inside the Graph Box */}
              <div className="flex items-center justify-between border-b border-[#1C2C28] pb-4 font-mono text-[10px] text-env-text-secondary/60">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-3.5 h-3.5 text-env-blue animate-pulse" />
                  <span className="text-env-text-secondary/80 font-bold uppercase tracking-wider">Repository: groc-ecosystem/builder-core</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline">Active branches: 4</span>
                  <span className="text-env-blue font-bold">// LIVE METRIC</span>
                </div>
              </div>

              {/* Central Graph Workspace */}
              <div className="relative flex-1 w-full my-4">
                
                {/* SVG Branches Layout */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                >
                  {/* Branch lines */}
                  {/* main branch: horizontal line at y=20 */}
                  <path 
                    d="M 5,20 L 95,20" 
                    fill="none" 
                    stroke="var(--brand-green)" 
                    strokeWidth="1.5" 
                    className="opacity-70"
                  />

                  {/* dev branch: branches at 15,20, dips to 40, merges at 90,20 */}
                  <path 
                    d="M 15,20 C 18,20 18,40 23,40 L 82,40 C 85,40 85,20 88,20" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="1.5" 
                    className="opacity-60"
                  />

                  {/* compiler branch: branches from dev at 30,40, dips to 60, merges back at 68,40 */}
                  <path 
                    d="M 30,40 C 32,40 32,60 35,60 L 58,60 C 61,60 61,40 64,40" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="1.25" 
                    className="opacity-60"
                  />

                  {/* ui-engine branch: branches from dev at 45,40, dips to 80, merges back at 78,40 */}
                  <path 
                    d="M 45,40 C 47,40 47,80 50,80 L 72,80 C 74,80 74,40 76,40" 
                    fill="none" 
                    stroke="#a855f7" 
                    strokeWidth="1.25" 
                    className="opacity-60"
                  />

                  {/* Animated commit packets flowing along branches - rendered only when visible in viewport */}
                  {isGraphInView && (
                    <>
                      {/* Main branch packet */}
                      <circle r="1.5" fill="var(--brand-green)">
                        <animateMotion dur="7s" repeatCount="indefinite" path="M 5,20 L 95,20" />
                      </circle>

                      {/* Dev branch packet */}
                      <circle r="1.5" fill="#3b82f6">
                        <animateMotion dur="9s" repeatCount="indefinite" path="M 15,20 C 18,20 18,40 23,40 L 82,40 C 85,40 85,20 88,20" />
                      </circle>

                      {/* Compiler branch packet */}
                      <circle r="1.25" fill="#f59e0b">
                        <animateMotion dur="6s" repeatCount="indefinite" path="M 30,40 C 32,40 32,60 35,60 L 58,60 C 61,60 61,40 64,40" />
                      </circle>
                      
                      {/* UI branch packet */}
                      <circle r="1.25" fill="#a855f7">
                        <animateMotion dur="8s" repeatCount="indefinite" path="M 45,40 C 47,40 47,80 50,80 L 72,80 C 74,80 74,40 76,40" />
                      </circle>
                    </>
                  )}
                </svg>

                {/* Branch Name Labels */}
                <div className="absolute left-1 top-[16%] font-mono text-[8px] md:text-[9px] text-brand-green/80 uppercase">main</div>
                <div className="absolute left-1 top-[36%] font-mono text-[8px] md:text-[9px] text-blue-400/80 uppercase">dev</div>
                <div className="absolute left-1 top-[56%] font-mono text-[8px] md:text-[9px] text-amber-500/80 uppercase">feat/compiler</div>
                <div className="absolute left-1 top-[76%] font-mono text-[8px] md:text-[9px] text-purple-400/80 uppercase">feat/ui-engine</div>

                {/* Render Commit Nodes on Top of SVG curves */}
                {COMMITS_DATA.map((commit) => {
                  const isHovered = hoveredCommit?.id === commit.id;
                  const isAnyHovered = hoveredCommit !== null;
                  
                  // Color mapped to branch name
                  let colorClass = "bg-brand-green border-brand-glow shadow-[0_0_6px_var(--brand-green)]";
                  if (commit.branch === "dev") {
                    colorClass = "bg-blue-500 border-blue-300 shadow-[0_0_6px_rgba(59,130,246,0.6)]";
                  } else if (commit.branch === "feature/compiler") {
                    colorClass = "bg-amber-500 border-amber-300 shadow-[0_0_6px_rgba(245,158,11,0.6)]";
                  } else if (commit.branch === "feature/ui-engine") {
                    colorClass = "bg-purple-500 border-purple-300 shadow-[0_0_6px_rgba(168,85,247,0.6)]";
                  }

                  return (
                    <div
                      key={commit.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 flex flex-col items-center group/node"
                      style={{
                        left: `${commit.cx}%`,
                        top: `${commit.cy}%`,
                      }}
                      onMouseEnter={() => setHoveredCommit(commit)}
                      onMouseLeave={() => setHoveredCommit(null)}
                    >
                      {/* Commit Node dot */}
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 border-env-secondary transition-all duration-300 ${
                          isHovered 
                            ? "scale-140 shadow-[0_0_12px_rgba(255,255,255,1)] bg-white border-white"
                            : isAnyHovered
                              ? "scale-90 opacity-40 " + colorClass
                              : "scale-100 " + colorClass
                        }`}
                      />
                      
                      {/* Commit SHA Tag displayed below node */}
                      <span className={`mt-2.5 font-mono text-[8px] px-1.5 py-0.5 rounded bg-zinc-950/80 border transition-all duration-300 ${
                        isHovered
                          ? "border-white/40 text-white"
                          : "border-zinc-900 text-zinc-500 group-hover/node:text-zinc-300"
                      }`}>
                        {commit.sha}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Graph legend / footer info */}
              <div className="flex items-center justify-between border-t border-[#1C2C28] pt-4 font-mono text-[8px] sm:text-[9px] text-env-text-secondary/50 select-none">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-env-green" />
                    <span>Main Production</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Dev Integration</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Compiler Spec</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>UI Engine Spec</span>
                  </div>
                </div>
                <div className="hidden sm:block">Hover commits to trace pull requests</div>
              </div>

              {/* Floating GitHub-style Commit Tooltip Popover */}
              <div
                className={`absolute bottom-16 left-6 right-6 md:right-auto md:w-96 p-4 rounded-xl border border-[#1C2C28] bg-[#0B1210]/95 backdrop-blur-md transition-all duration-300 z-30 shadow-2xl flex flex-col gap-3 ${
                  hoveredCommit ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                }`}
              >
                {hoveredCommit && (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <div className="flex items-center gap-1.5 text-env-text-secondary">
                        <User className="w-3.5 h-3.5 text-env-text-secondary/60" />
                        <span className="font-bold text-env-text-primary">{hoveredCommit.author}</span>
                        <span>({hoveredCommit.role})</span>
                      </div>
                      <span className="text-env-text-secondary/50">{hoveredCommit.date}</span>
                    </div>

                    {/* Commit Message */}
                    <div className="flex items-start gap-2">
                      <Code className="w-4 h-4 text-env-blue mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-[#E5ECE9] font-sans leading-snug">
                        {hoveredCommit.msg}
                      </p>
                    </div>

                    {/* Commit Hash and Specs */}
                    <div className="flex items-center justify-between border-t border-[#1C2C28] pt-3 text-[10px] font-mono select-none">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-[#111A17] border border-[#1C2C28] text-env-text-secondary font-bold uppercase">
                          commit {hoveredCommit.sha}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-env-blue/10 text-env-blue border border-env-blue/20 uppercase">
                          {hoveredCommit.branch}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-env-green">+{hoveredCommit.additions}</span>
                        <span className="text-rose-400">-{hoveredCommit.deletions}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          </FadeIn>

          {/* Git Terminal / Live listener Feed (Spans 1 column) */}
          <FadeIn direction="up" delay={0.5} className="relative">
            <div className="relative w-full h-[360px] md:h-[420px] lg:h-[480px] rounded-2xl border border-[#1C2C28] bg-env-surface/90 backdrop-blur-md p-5 font-mono text-xs flex flex-col justify-between overflow-hidden shadow-xl">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-[#1C2C28] pb-3 select-none mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-env-text-secondary/60" />
                  <span className="text-env-text-secondary font-bold uppercase tracking-wider text-[10px]">Git Terminal Listener</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/60" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/60" />
                  <span className="w-2 h-2 rounded-full bg-env-green/60" />
                </div>
              </div>

              {/* Logs Stream Workspace */}
              <div 
                ref={terminalContainerRef}
                className="flex-1 w-full overflow-y-auto space-y-2.5 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent pr-1"
              >
                {logs.map((log, idx) => {
                  let textClass = "text-env-text-secondary";
                  if (log.startsWith("system:")) {
                    textClass = "text-[#4F625A]";
                  } else if (log.startsWith("git:")) {
                    textClass = "text-env-blue font-semibold";
                  } else if (log.includes("main")) {
                    textClass = "text-env-text-primary border-l border-env-green/40 pl-2";
                  } else if (log.includes("dev")) {
                    textClass = "text-env-text-primary border-l border-blue-500/40 pl-2";
                  } else if (log.includes("compiler")) {
                    textClass = "text-env-text-primary border-l border-amber-500/40 pl-2";
                  } else if (log.includes("ui-engine")) {
                    textClass = "text-env-text-primary border-l border-purple-500/40 pl-2";
                  }

                  return (
                    <div 
                      key={idx} 
                      className={`leading-relaxed text-[10px] md:text-[11px] font-mono transition-opacity duration-300 ${textClass}`}
                    >
                      {log}
                    </div>
                  );
                })}
              </div>

              {/* Terminal command entry line */}
              <div className="border-t border-[#1C2C28] pt-3 mt-3 flex items-center justify-between text-env-text-secondary/50 text-[10px] select-none">
                <span>groc-shell v1.3</span>
                <span className="flex items-center gap-1.5 text-env-text-secondary/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-env-green shadow-[0_0_6px_var(--color-env-green)] animate-pulse" />
                  Listening on web socket...
                </span>
              </div>

            </div>
          </FadeIn>

        </div>

      </div>
    </section>
  );
};
