"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, Folder, FolderOpen, FileCode, Terminal, Play, Check } from "lucide-react";
import { FadeIn } from "../motion/motion-primitives";

export const FooterCTA: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  // File tree folder state
  const [isSrcOpen, setIsSrcOpen] = useState(true);
  const [isDocsOpen, setIsDocsOpen] = useState(true);
  const [isConfigOpen, setIsConfigOpen] = useState(true);

  // Terminal state
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "groc-bash v1.2 ready. Select a command script above to compile."
  ]);
  const [activeCmd, setActiveCmd] = useState<string | null>(null);
  const consoleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Rely on caching, but check loaded state
    const img = new Image();
    img.src = "/asset/GROC_landing_sec.webp";
    img.onload = () => {
      setBgLoaded(true);
    };
  }, []);

  // Auto scroll terminal container directly (fixes viewport scroll hijacking)
  useEffect(() => {
    if (consoleContainerRef.current) {
      consoleContainerRef.current.scrollTop = consoleContainerRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setIsSubmitted(true);
  };

  const runTerminalCommand = (cmd: string) => {
    if (activeCmd) return; // Prevent clicking while running
    setActiveCmd(cmd);
    setTerminalOutput([`$ ${cmd}`]);

    if (cmd === "pnpm install") {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, "Resolving dependencies...", "Fetching lockfile and dependency tree..."]);
      }, 300);
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, "Selected 324 node modules.", "✔ Installed successfully in 1.4s."]);
        setActiveCmd(null);
      }, 1000);
    } else if (cmd === "pnpm run dev") {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, "▲ Next.js 16.2.9 (Turbopack)", "  - Local: http://localhost:3000"]);
      }, 300);
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, "✓ Compiled /components/sections/growth-morph.tsx in 110ms", "✓ Decompiled caches refreshed.", "✔ Server active and ready."]);
        setActiveCmd(null);
      }, 1000);
    } else if (cmd === "git push origin main") {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, "Enumerating objects: 12, done.", "Writing objects: 100% (12/12), 1.2 KiB, done."]);
      }, 300);
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, "To github.com:groc/landing-platform.git", "  aef30a1..7f2a18e  main -> main", "✔ Code successfully deployed to Vercel production edge!"]);
        setActiveCmd(null);
      }, 1000);
    }
  };

  return (
    <section
      id="join"
      className="relative w-full overflow-hidden flex flex-col items-center justify-between px-6 pt-24 pb-12 bg-env-primary border-t border-[#1C2C28]"
    >
      {/* Ambient Glow */}
      <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-[80vw] h-[40vw] max-w-[800px] bg-env-blue/8 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-slow" />

      {/* Looping WebP background matching Hero */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 -z-10 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: bgLoaded ? "url('/asset/GROC_landing_sec.webp')" : "none",
          opacity: bgLoaded ? 0.15 : 0,
        }}
      />

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-env-primary via-transparent to-env-primary pointer-events-none -z-10" />

      {/* Central narrative closure */}
      <div className="w-full max-w-3xl flex flex-col items-center justify-center text-center z-10 mb-20">
        <FadeIn direction="up" delay={0.1}>
          <span className="font-mono text-xs text-env-blue uppercase tracking-widest font-semibold">
            // final prompt
          </span>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2} className="mt-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-env-text-primary leading-tight">
            A year from now, your contribution graph will look different.
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.3} className="mt-5">
          <p className="text-lg md:text-xl font-mono text-env-sky font-medium italic">
            The question is — will you?
          </p>
        </FadeIn>

        {/* Input Form with Premium Glow effects */}
        <FadeIn direction="up" delay={0.4} className="mt-10 w-full max-w-md">
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="relative flex items-center p-1 rounded-full border border-[#1C2C28] bg-[#0B1210]/60 backdrop-blur-md focus-within:border-env-blue/60 transition-all duration-300"
            >
              <input
                type="email"
                placeholder="Enter email to request access..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-transparent px-5 py-3.5 text-sm text-white focus:outline-none placeholder-env-text-secondary/40 font-sans"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-3 rounded-full bg-env-blue text-black hover:bg-env-sky transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:scale-[1.02]"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-3 py-4 text-center font-mono">
              <div className="flex items-center gap-2 text-env-sky bg-env-blue/10 border border-env-blue/30 px-5 py-2.5 rounded-full animate-bounce">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Access Requested Successfully</span>
              </div>
              <p className="text-xs text-env-text-secondary/50 mt-2">
                We have added you to our builders queue. Standby.
              </p>
            </div>
          )}
        </FadeIn>
      </div>

      {/* Overhauled Premium Footer: Git File Tree navigation and bash console terminal */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch border-t border-[#1C2C28] pt-16 pb-8 z-10">
        
        {/* Left Column: Repository Folder Structure Navigation */}
        <div className="flex flex-col gap-6">
          <div className="font-mono text-env-text-secondary/50 text-[10px] uppercase tracking-wider select-none">
            Repository Directory Index (Click folders)
          </div>
          
          <div className="flex flex-col gap-3 font-mono text-xs select-none">
            
            {/* Folder 1: src */}
            <div className="flex flex-col gap-1.5">
              <button 
                onClick={() => setIsSrcOpen(!isSrcOpen)}
                className="flex items-center gap-2 text-env-text-secondary hover:text-env-sky transition-colors"
              >
                {isSrcOpen ? <FolderOpen className="w-4 h-4 text-env-blue" /> : <Folder className="w-4 h-4 text-env-text-secondary/40" />}
                <span className="font-semibold">src/</span>
              </button>
              {isSrcOpen && (
                <div className="pl-6 border-l border-[#1C2C28] ml-2 flex flex-col gap-2 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <a href="#about" className="flex items-center gap-2 text-env-text-secondary/60 hover:text-env-sky transition-colors">
                    <FileCode className="w-3.5 h-3.5 text-env-text-secondary/40" />
                    <span>about-us.tsx</span>
                  </a>
                  <a href="#join" className="flex items-center gap-2 text-env-text-secondary/60 hover:text-env-sky transition-colors">
                    <FileCode className="w-3.5 h-3.5 text-env-text-secondary/40" />
                    <span>ecosystem.tsx</span>
                  </a>
                  <a href="#why-groc" className="flex items-center gap-2 text-env-text-secondary/60 hover:text-env-sky transition-colors">
                    <FileCode className="w-3.5 h-3.5 text-env-text-secondary/40" />
                    <span>compiler-proofs.tsx</span>
                  </a>
                </div>
              )}
            </div>

            {/* Folder 2: docs */}
            <div className="flex flex-col gap-1.5 mt-2">
              <button 
                onClick={() => setIsDocsOpen(!isDocsOpen)}
                className="flex items-center gap-2 text-env-text-secondary hover:text-env-sky transition-colors"
              >
                {isDocsOpen ? <FolderOpen className="w-4 h-4 text-env-blue" /> : <Folder className="w-4 h-4 text-env-text-secondary/40" />}
                <span className="font-semibold">docs/</span>
              </button>
              {isDocsOpen && (
                <div className="pl-6 border-l border-[#1C2C28] ml-2 flex flex-col gap-2 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <a href="#handbook" className="flex items-center gap-2 text-env-text-secondary/60 hover:text-env-sky transition-colors">
                    <FileCode className="w-3.5 h-3.5 text-env-text-secondary/40" />
                    <span>handbook.md</span>
                  </a>
                  <a href="#proof" className="flex items-center gap-2 text-env-text-secondary/60 hover:text-env-sky transition-colors">
                    <FileCode className="w-3.5 h-3.5 text-env-text-secondary/40" />
                    <span>proofs-matrix.json</span>
                  </a>
                  <a href="#faq" className="flex items-center gap-2 text-env-text-secondary/60 hover:text-env-sky transition-colors">
                    <FileCode className="w-3.5 h-3.5 text-env-text-secondary/40" />
                    <span>faq.yaml</span>
                  </a>
                </div>
              )}
            </div>

            {/* Folder 3: configs */}
            <div className="flex flex-col gap-1.5 mt-2">
              <button 
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                className="flex items-center gap-2 text-env-text-secondary hover:text-env-sky transition-colors"
              >
                {isConfigOpen ? <FolderOpen className="w-4 h-4 text-env-blue" /> : <Folder className="w-4 h-4 text-env-text-secondary/40" />}
                <span className="font-semibold">configs/</span>
              </button>
              {isConfigOpen && (
                <div className="pl-6 border-l border-[#1C2C28] ml-2 flex flex-col gap-2 py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-env-text-secondary/60 hover:text-env-sky transition-colors">
                    <FileCode className="w-3.5 h-3.5 text-env-text-secondary/40" />
                    <span>github.json</span>
                  </a>
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-env-text-secondary/60 hover:text-env-sky transition-colors">
                    <FileCode className="w-3.5 h-3.5 text-env-text-secondary/40" />
                    <span>vercel.cfg</span>
                  </a>
                  <a href="https://linear.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-env-text-secondary/60 hover:text-env-sky transition-colors">
                    <FileCode className="w-3.5 h-3.5 text-env-text-secondary/40" />
                    <span>linear.cfg</span>
                  </a>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Column: Interactive IDE bash console */}
        <div className="flex flex-col gap-4">
          <div className="font-mono text-env-text-secondary/50 text-[10px] uppercase tracking-wider select-none">
            Interactive scripts compiler console
          </div>

          <div className="rounded-xl border border-[#1C2C28] bg-[#0B1210]/90 backdrop-blur-md p-4 flex flex-col justify-between h-[220px] shadow-lg font-mono">
            {/* IDE Toolbar */}
            <div className="flex items-center justify-between border-b border-[#1C2C28] pb-3 select-none mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-env-text-secondary/60" />
                <span className="text-[10px] text-env-text-secondary font-bold">bash - groc@local:~/compiler</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] text-env-text-secondary/50 font-bold">STATUS: {activeCmd ? "COMPILING" : "READY"}</span>
              </div>
            </div>

            {/* Simulated compiler log output */}
            <div 
              ref={consoleContainerRef}
              className="flex-1 overflow-y-auto space-y-1.5 text-[10px] leading-relaxed text-env-text-secondary/80 scrollbar-thin pr-1"
            >
              {terminalOutput.map((log, idx) => {
                let logClass = "text-env-text-secondary/70";
                if (log.startsWith("$")) {
                  logClass = "text-env-blue font-bold";
                } else if (log.startsWith("✔")) {
                  logClass = "text-env-green font-bold";
                } else if (log.startsWith("▲") || log.startsWith("✓")) {
                  logClass = "text-env-sky";
                }
                return (
                  <div key={idx} className={logClass}>
                    {log}
                  </div>
                );
              })}
            </div>

            {/* Quick scripts panel */}
            <div className="border-t border-[#1C2C28] pt-3 mt-3 flex items-center justify-between select-none">
              <span className="text-[9px] text-env-text-secondary/40 uppercase">Interactive compiler commands:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => runTerminalCommand("pnpm install")}
                  disabled={activeCmd !== null}
                  className="px-2.5 py-1 rounded border border-[#1C2C28] bg-[#111A17] hover:bg-[#0B1210] hover:border-env-blue/50 text-[10px] text-env-text-secondary/70 hover:text-env-sky transition-all duration-200 flex items-center gap-1 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-2.5 h-2.5 text-env-blue" />
                  install
                </button>
                <button
                  onClick={() => runTerminalCommand("pnpm run dev")}
                  disabled={activeCmd !== null}
                  className="px-2.5 py-1 rounded border border-[#1C2C28] bg-[#111A17] hover:bg-[#0B1210] hover:border-env-blue/50 text-[10px] text-env-text-secondary/70 hover:text-env-sky transition-all duration-200 flex items-center gap-1 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-2.5 h-2.5 text-env-blue" />
                  run dev
                </button>
                <button
                  onClick={() => runTerminalCommand("git push origin main")}
                  disabled={activeCmd !== null}
                  className="px-2.5 py-1 rounded border border-[#1C2C28] bg-[#111A17] hover:bg-[#0B1210] hover:border-env-blue/50 text-[10px] text-env-text-secondary/70 hover:text-env-sky transition-all duration-200 flex items-center gap-1 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className="w-2.5 h-2.5 text-env-blue" />
                  git push
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Minimal Bottom Footer Credits */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4 z-10 border-t border-[#1C2C28] pt-8 mt-8 font-mono text-[10px] text-env-text-secondary/40">
        <span>© {new Date().getFullYear()} GROC LABS. ALL REPOSITORIES OPEN SOURCE.</span>
        <div className="flex items-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-env-sky transition-colors">
            GITHUB
          </a>
          <a href="https://linear.app" target="_blank" rel="noopener noreferrer" className="hover:text-env-sky transition-colors">
            LINEAR
          </a>
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-env-sky transition-colors">
            VERCEL
          </a>
        </div>
      </div>
    </section>
  );
};
