"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, GitBranch, ChevronDown, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeBranch, setActiveBranch] = useState("main");
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeBranch = (branch: string) => {
    setActiveBranch(branch);
    setIsOpen(false);
    document.documentElement.setAttribute("data-branch", branch);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-dark-bg/80 backdrop-blur-md border-b border-white/5 py-3.5"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo & Branch Switcher */}
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2 select-none group">
            <div className="w-6 h-6 rounded-md bg-brand-green flex justify-center items-center font-bold text-black text-xs transition-transform duration-300 group-hover:rotate-12">
              G
            </div>
            <span className="font-mono text-sm tracking-widest text-white font-bold group-hover:text-brand-glow transition-colors">
              // GROC.BUILD
            </span>
          </a>

          {/* Git Branch Switcher Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-zinc-800 bg-card-bg/80 text-[11px] font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-all duration-200"
            >
              <GitBranch className="w-3.5 h-3.5 text-brand-green" />
              <span>{activeBranch}</span>
              <ChevronDown className={`w-3 h-3 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <>
                {/* Backdrop overlay to close click */}
                <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                <div 
                  role="listbox"
                  className="absolute left-0 mt-1.5 w-48 rounded-md border border-zinc-800 bg-card-bg/95 backdrop-blur-md shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <div className="px-3 py-1.5 border-b border-zinc-800 text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                    Switch branches
                  </div>
                  {[
                    { id: "main", label: "main", color: "bg-brand-green" },
                    { id: "dev-blue", label: "dev-blue", color: "bg-blue-500" },
                    { id: "canary-amber", label: "canary-amber", color: "bg-amber-500" },
                    { id: "experimental-purple", label: "experimental-purple", color: "bg-purple-500" },
                  ].map((branch) => (
                    <button
                      key={branch.id}
                      role="option"
                      aria-selected={activeBranch === branch.id}
                      onClick={() => changeBranch(branch.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-mono transition-colors hover:bg-zinc-900 ${
                        activeBranch === branch.id ? "text-brand-green font-semibold" : "text-zinc-400"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${branch.color}`} />
                        <span>{branch.label}</span>
                      </div>
                      {activeBranch === branch.id && (
                        <span className="text-[10px] text-brand-green font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 font-mono text-[10px] text-zinc-400">
          <a href="#philosophy" className="hover:text-brand-glow hover:text-white transition-colors uppercase tracking-widest">Philosophy</a>
          <a href="#network" className="hover:text-brand-glow hover:text-white transition-colors uppercase tracking-widest">Network</a>
          <a href="#stakeholders" className="hover:text-brand-glow hover:text-white transition-colors uppercase tracking-widest">Ecosystem Hub</a>
          <a href="#proof" className="hover:text-brand-glow hover:text-white transition-colors uppercase tracking-widest">Proof</a>
          <a href="#faq" className="hover:text-brand-glow hover:text-white transition-colors uppercase tracking-widest">FAQ</a>
        </div>

        {/* Action Button & Hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#join"
            className="hidden sm:flex group relative items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-semibold text-white transition-all duration-300 hover:border-brand-green/50 hover:bg-brand-green/10"
          >
            Join Ecosystem
            <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-brand-glow transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-1.5 rounded-md border border-zinc-800 bg-card-bg/85 text-zinc-400 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-b border-white/5 bg-dark-bg/95 backdrop-blur-md py-6 px-8 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4 font-mono text-xs text-zinc-400">
            <a 
              href="#philosophy" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-glow hover:text-white py-1 transition-colors uppercase tracking-widest"
            >
              Philosophy
            </a>
            <a 
              href="#network" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-glow hover:text-white py-1 transition-colors uppercase tracking-widest"
            >
              Network
            </a>
            <a 
              href="#stakeholders" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-glow hover:text-white py-1 transition-colors uppercase tracking-widest"
            >
              Ecosystem Hub
            </a>
            <a 
              href="#proof" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-glow hover:text-white py-1 transition-colors uppercase tracking-widest"
            >
              Proof
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-brand-glow hover:text-white py-1 transition-colors uppercase tracking-widest"
            >
              FAQ
            </a>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/5 pt-4">
            {/* Mobile Branch Switcher */}
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-zinc-500 uppercase tracking-widest text-[10px]">Active Branch:</span>
              <div className="flex gap-1.5">
                {[
                  { id: "main", color: "bg-brand-green" },
                  { id: "dev-blue", color: "bg-blue-500" },
                  { id: "canary-amber", color: "bg-amber-500" },
                  { id: "experimental-purple", color: "bg-purple-500" },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => changeBranch(b.id)}
                    aria-label={`Switch branch to ${b.id}`}
                    className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                      activeBranch === b.id ? "border-white scale-110" : "border-transparent"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${b.color}`} />
                  </button>
                ))}
              </div>
            </div>

            <a
              href="#join"
              onClick={() => setMobileMenuOpen(false)}
              className="group flex items-center justify-center gap-1.5 w-full py-3.5 rounded-full bg-brand-green text-black text-xs font-semibold hover:bg-brand-glow transition-all duration-300"
            >
              Join Ecosystem
              <ArrowUpRight className="w-3 h-3 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
