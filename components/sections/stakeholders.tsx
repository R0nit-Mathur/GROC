"use client";

import React, { useState } from "react";
import { 
  User, 
  GitPullRequest, 
  Briefcase, 
  BookOpen, 
  Heart, 
  CheckCircle2, 
  Terminal, 
  ArrowRight,
  GitBranch,
  Shield,
  Search,
  Zap
} from "lucide-react";
import { FadeIn } from "../motion/motion-primitives";

interface Stakeholder {
  id: string;
  tabLabel: string;
  icon: React.ComponentType<any>;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  ctaText: string;
  ctaLink: string;
}

const STAKEHOLDERS_DATA: Stakeholder[] = [
  {
    id: "students",
    tabLabel: "Students",
    icon: User,
    title: "For Builders & Students",
    tagline: "Accelerate your growth through compiled proof.",
    description: "Stop submitting generic resumes. Build production-grade LSM-tree storage engines, Solidity fee minimizers, or next-generation compilers. Ship your code under curator supervision, compile real proof-of-work, and get discovered by elite technology teams.",
    benefits: [
      "Vetted system design challenges",
      "Direct code reviews from core curators",
      "Verifiable GitHub contribution history",
      "Priority referral pipeline to top tech startups"
    ],
    ctaText: "Start Building Proof",
    ctaLink: "#join"
  },
  {
    id: "maintainers",
    tabLabel: "Maintainers",
    icon: GitPullRequest,
    title: "For Project Maintainers",
    tagline: "Inject high-signal momentum into your repository.",
    description: "Exhausted by low-quality, spam pull requests? GROC funnels dedicated, vetted builders directly into your codebase. Our curators pre-screen modules and coordinate features, ensuring every merge request meets strict production standards.",
    benefits: [
      "Spam-free contribution pipelines",
      "Curator-coordinated feature sets",
      "Thorough testing and lint coverage",
      "Sustainable growth for open-source repos"
    ],
    ctaText: "List Your Repository",
    ctaLink: "#join"
  },
  {
    id: "companies",
    tabLabel: "Companies",
    icon: Briefcase,
    title: "For Startups & Engineering Teams",
    tagline: "Access India's open source talent pipeline.",
    description: "Resume screening is broken. GROC serves as a transparent talent engine, letting you inspect verified commits, compiler optimization proofs, and database engines running live at scale. Recruit the top 1% builders with complete confidence.",
    benefits: [
      "Zero-fluff candidate profiles",
      "Direct verification of architectural skills",
      "Hire builders who have shipped production code",
      "Direct ecosystem sponsorship placement"
    ],
    ctaText: "Discover Engineering Talent",
    ctaLink: "#join"
  },
  {
    id: "universities",
    tabLabel: "Universities",
    icon: BookOpen,
    title: "For Academic Institutions",
    tagline: "Bridge classroom theory with industry execution.",
    description: "Bridge the gap between theoretical computer science and active industry environments. Integrate GROC's curator-led repositories into your curricula, letting students write code that runs in real-world systems.",
    benefits: [
      "Production-grade compiler specs for labs",
      "Mentorship alignment from core curators",
      "Real-world open-source lab assignments",
      "Industry placement routes for top students"
    ],
    ctaText: "Partner with GROC",
    ctaLink: "#join"
  },
  {
    id: "sponsors",
    tabLabel: "Sponsors",
    icon: Heart,
    title: "For Sponsors & DevRel Teams",
    tagline: "Sponsor open infrastructure and build developer goodwill.",
    description: "Support the next generation of India's developer infrastructure. Sponsor core project cycles, get your APIs in front of elite creators, and establish authentic brand integration within the contributor community.",
    benefits: [
      "Targeted API adoption pathways",
      "High-visibility repository attribution tags",
      "Direct feedback from elite systems developers",
      "Sponsor-specific builder hack-tracks"
    ],
    ctaText: "Become a Sponsor",
    ctaLink: "#join"
  }
];

export const Stakeholders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("students");
  const activeData = STAKEHOLDERS_DATA.find((item) => item.id === activeTab) || STAKEHOLDERS_DATA[0];

  return (
    <section id="stakeholders" className="relative py-28 md:py-36 px-6 bg-env-primary border-t border-[#162722] overflow-hidden flex flex-col items-center">
      {/* Light pulse element */}
      <div className="absolute top-0 left-1/4 w-[40vw] h-[40vw] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="w-full max-w-6xl z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn direction="up" delay={0.1}>
            <span className="font-mono text-xs text-brand-green uppercase tracking-widest font-semibold">
              // Ecosystem Hub
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} className="mt-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-env-text-primary leading-tight">
              One ecosystem. Five stakeholders.
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.3} className="mt-4 max-w-2xl mx-auto text-env-text-secondary">
            GROC connects builders, curators, maintainers, companies, and universities into a unified, compounding open-source network.
          </FadeIn>
        </div>

        {/* Tab Buttons (Horizontal on Desktop, Grid on Mobile) */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {STAKEHOLDERS_DATA.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-mono text-xs transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "bg-brand-green border-brand-green text-black font-semibold shadow-[0_0_15px_rgba(34,197,94,0.25)] scale-[1.02]"
                    : "bg-env-surface/50 border-[#1C2C28] text-env-text-secondary hover:text-white hover:border-zinc-700"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Main Tab Content Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: Descriptions & Benefits (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl border border-[#162722] bg-env-surface/30 backdrop-blur-sm">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] text-brand-green">
                <Zap className="w-3 h-3 animate-pulse" />
                <span className="uppercase tracking-widest font-bold">Role Curation // Active</span>
              </div>
              <h3 className="mt-6 text-2xl md:text-3xl font-bold text-env-text-primary tracking-tight">
                {activeData.title}
              </h3>
              <p className="mt-2 font-mono text-[11px] text-env-sky uppercase tracking-wider font-semibold">
                {activeData.tagline}
              </p>
              <p className="mt-4 text-sm text-env-text-secondary leading-relaxed font-sans">
                {activeData.description}
              </p>

              {/* Bulleted Benefits */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeData.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <span className="text-xs text-env-text-primary font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 pt-6 border-t border-[#162722]">
              <a
                href={activeData.ctaLink}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-green text-black font-semibold text-xs transition-all duration-300 hover:scale-[1.03] shadow-[0_0_15px_rgba(34,197,94,0.25)]"
              >
                <span>{activeData.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Mockup Widget (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center p-6 rounded-2xl border border-[#162722] bg-[#050807]/90 min-h-[300px]">
            
            {/* Widget Header */}
            <div className="flex items-center justify-between border-b border-[#1C2C28] pb-3 select-none mb-4 font-mono text-[9px] text-zinc-500">
              <span className="flex items-center gap-1.5 uppercase font-semibold">
                <Terminal className="w-3 h-3 text-brand-green" />
                Ecosystem Verification
              </span>
              <span className="text-brand-green font-bold">// SECURE PASS</span>
            </div>

            {/* Render Stakeholder-Specific Mockups */}
            <div className="flex-1 flex flex-col justify-center font-mono">
              
              {/* Mockup 1: Students */}
              {activeTab === "students" && (
                <div className="space-y-3.5 text-xs text-zinc-400">
                  <div className="p-3 rounded-lg border border-[#162722] bg-[#0B1210]">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">ronit-mathur.groc</span>
                      <span className="text-[9px] bg-brand-green/10 border border-brand-green/20 text-brand-green px-2 py-0.5 rounded-full font-bold">VERIFIED</span>
                    </div>
                    <div className="mt-2 text-[10px] space-y-1">
                      <div>Cohort Status: <span className="text-white">Active</span></div>
                      <div>Curation Engine: <span className="text-white">LSM-Tree KeyValue</span></div>
                      <div>Scorecard: <span className="text-brand-green font-semibold">98.5% Performance</span></div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg border border-[#162722] bg-[#0B1210]/50 space-y-1.5 text-[9px]">
                    <div className="text-zinc-500">RECENT SHIPPED PROOF:</div>
                    <div className="flex items-center justify-between text-[#B4C0BB]">
                      <span>Contributed: compact-scheduler.go</span>
                      <span className="text-brand-green">+120 lines</span>
                    </div>
                    <div className="flex items-center justify-between text-[#B4C0BB]">
                      <span>Reviewed: memtable-wal-engine.go</span>
                      <span className="text-brand-green">Approved</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mockup 2: Maintainers */}
              {activeTab === "maintainers" && (
                <div className="space-y-3.5 text-xs text-zinc-400">
                  <div className="p-3 rounded-lg border border-[#162722] bg-[#0B1210]">
                    <div className="flex items-center justify-between text-zinc-300 font-bold border-b border-[#1C2C28] pb-1.5 mb-2 text-[10px]">
                      <span>Vetted Queue for repo/core</span>
                      <span className="text-brand-green">● Ready</span>
                    </div>
                    <div className="space-y-1.5 text-[10px]">
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>PR #182: cache eviction</span>
                        <span className="text-brand-green">Vetted (Elena)</span>
                      </div>
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>PR #185: AST Optimizer</span>
                        <span className="text-brand-green">Vetted (Kaelen)</span>
                      </div>
                      <div className="flex items-center justify-between text-zinc-500 line-through">
                        <span>PR #189: docs change spam</span>
                        <span className="text-rose-400">Blocked</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] text-[#4F625A] px-2">
                    <Shield className="w-3.5 h-3.5 text-[#4F625A]" />
                    <span>0 spam commits allowed in main branch today.</span>
                  </div>
                </div>
              )}

              {/* Mockup 3: Companies */}
              {activeTab === "companies" && (
                <div className="space-y-3 text-xs text-zinc-400">
                  <div className="p-3 rounded-lg border border-[#162722] bg-[#0B1210] space-y-2">
                    <div className="flex items-center gap-2 bg-[#050807] border border-[#1C2C28] px-2.5 py-1.5 rounded text-[10px]">
                      <Search className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-zinc-300 font-semibold">Query: Solidity Compilers</span>
                    </div>
                    <div className="space-y-1.5 text-[10px] pt-1">
                      <div className="flex items-center justify-between bg-[#050807]/50 p-1.5 rounded border border-[#162722]">
                        <span className="font-semibold text-white">Elena M. (EVM lead)</span>
                        <span className="text-brand-green font-bold">Match: 99.1%</span>
                      </div>
                      <div className="flex items-center justify-between bg-[#050807]/50 p-1.5 rounded border border-[#162722]">
                        <span className="font-semibold text-white">Marcus R. (Rust/C++)</span>
                        <span className="text-brand-green font-bold">Match: 97.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mockup 4: Universities */}
              {activeTab === "universities" && (
                <div className="space-y-3.5 text-xs text-zinc-400">
                  <div className="p-3 rounded-lg border border-[#162722] bg-[#0B1210] text-[10px] space-y-2">
                    <div className="flex items-center justify-between font-bold border-b border-[#1C2C28] pb-1.5 mb-1.5 text-zinc-300">
                      <span>IIT Delhi - Compiler Lab</span>
                      <span className="text-brand-green">Active Hub</span>
                    </div>
                    <div className="space-y-1">
                      <div>Active Lab Members: <span className="text-white">42 Builders</span></div>
                      <div>Completed Curation Passes: <span className="text-white">12 Modules</span></div>
                      <div>Integration Status: <span className="text-brand-green font-bold">98% Compiled</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Mockup 5: Sponsors */}
              {activeTab === "sponsors" && (
                <div className="space-y-3.5 text-xs text-zinc-400">
                  <div className="p-3 rounded-lg border border-[#162722] bg-[#0B1210] text-[10px] space-y-2">
                    <div className="flex items-center justify-between font-bold border-b border-[#1C2C28] pb-1.5 mb-1.5 text-zinc-300">
                      <span>API Sponsorship Matrix</span>
                      <span className="text-brand-green">Stats</span>
                    </div>
                    <div className="space-y-1">
                      <div>Sponsor Brand: <span className="text-white">Vercel & Linear</span></div>
                      <div>API Integration Hits: <span className="text-white">1.42M requests</span></div>
                      <div>Developer Outreach: <span className="text-white">500+ active builders</span></div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Widget Footer */}
            <div className="border-t border-[#1C2C28] pt-3 mt-4 flex items-center justify-between font-mono text-[9px] text-[#4F625A]">
              <span>Compiler Pipeline v1.3</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                Network verified
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
