"use client";

import React from "react";
import { Terminal, Lightbulb, Compass } from "lucide-react";
import { FadeIn } from "../motion/motion-primitives";

const PILLARS = [
  {
    icon: Terminal,
    title: "Build",
    tagline: "Repetition breeds execution.",
    description:
      "We believe writing code is a craft refined by hours of shipping. No theoretical lectures or trivia—just continuous cycles of building real products that handle actual requests.",
  },
  {
    icon: Lightbulb,
    title: "Learn",
    tagline: "Learn in the open.",
    description:
      "Synthesize concepts by explaining them. We document bugs publicly, do transparent pull requests, and review each other's system architectures so nobody builds in a silo.",
  },
  {
    icon: Compass,
    title: "Ship",
    tagline: "Production is the source of truth.",
    description:
      "An application doesn't exist until it's deployed to users. We optimize build compilation, setup CI/CD pipelines, audit performance metrics, and study production errors.",
  },
];

export const WhyGroc: React.FC = () => {
  return (
    <section className="relative py-28 md:py-36 px-6 bg-[#F4F7F5] border-y border-[#D2DDD7] overflow-hidden flex flex-col items-center">
      {/* Background Grid Accent adapted for light theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2EDE7_1px,transparent_1px),linear-gradient(to_bottom,#E2EDE7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10 opacity-60" />

      <div className="w-full max-w-5xl">
        {/* Typographic Header */}
        <div className="text-center mb-20">
          <FadeIn direction="up" delay={0.1}>
            <span className="font-mono text-xs text-env-forest uppercase tracking-widest font-bold">
              // Core Philosophy
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} className="mt-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#050807]">
              The Three Pillars of GROC
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.3} className="mt-4 max-w-xl mx-auto text-[#4F625A]">
            We operate outside traditional structures. Here are the core guidelines that shape our community and build our members.
          </FadeIn>
        </div>

        {/* Elegant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <FadeIn
                key={idx}
                direction="up"
                delay={0.15 * (idx + 1)}
                className={`group relative flex flex-col justify-between p-8 rounded-2xl border border-[#D2DDD7] bg-white transition-all duration-300 hover:translate-y-[-4px] ${
                  idx === 0
                    ? "hover:border-env-green hover:shadow-[0_8px_30px_rgba(74,222,128,0.12)]"
                    : idx === 1
                      ? "hover:border-env-blue hover:shadow-[0_8px_30px_rgba(56,189,248,0.12)]"
                      : "hover:border-env-gold hover:shadow-[0_8px_30px_rgba(212,175,55,0.12)]"
                }`}
              >
                {/* Spotlight hover effect top border glow */}
                <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  idx === 0
                    ? "via-env-green/50"
                    : idx === 1
                      ? "via-env-blue/50"
                      : "via-env-gold/50"
                }`} />
                
                <div>
                  <div className={`w-10 h-10 rounded-lg bg-[#F4F7F5] border border-[#D2DDD7] flex justify-center items-center text-[#4F625A] transition-colors duration-300 ${
                    idx === 0
                      ? "group-hover:text-env-forest group-hover:border-env-green"
                      : idx === 1
                        ? "group-hover:text-env-blue group-hover:border-env-blue"
                        : "group-hover:text-env-gold group-hover:border-env-gold"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-[#050807] tracking-tight">
                    {pillar.title}
                  </h3>
                  <span className={`mt-2 block font-mono text-[11px] uppercase tracking-wider font-semibold ${
                    idx === 0
                      ? "text-env-forest"
                      : idx === 1
                        ? "text-env-blue"
                        : "text-env-gold"
                  }`}>
                    {pillar.tagline}
                  </span>
                  <p className="mt-4 text-sm text-[#4F625A] leading-relaxed font-sans">
                    {pillar.description}
                  </p>

                  {/* Visual flavor mock widgets (Dark high contrast inside light card) */}
                  {idx === 0 && (
                    <div className="mt-5 p-3 rounded-lg bg-[#0B1210] border border-[#1A2824] group-hover:border-env-green/20 font-mono text-[9px] text-[#B4C0BB]/70 transition-all duration-300 select-none">
                      <div className="flex items-center justify-between text-[#F5F7F6] mb-1 border-b border-[#1A2824]/50 pb-1 font-semibold">
                        <span>$ gcc compiler.c -o main</span>
                        <span className="text-env-green font-bold">● SUCCESS</span>
                      </div>
                      <div className="text-[#B4C0BB]/50 space-y-0.5">
                        <div>[1/3] Parsing compiler tokens...</div>
                        <div>[2/3] Optimization compiler pass...</div>
                        <div>[3/3] Native assembly generated (24KB)</div>
                      </div>
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="mt-5 p-3 rounded-lg bg-[#0B1210] border border-[#1A2824] group-hover:border-env-blue/20 font-mono text-[9px] text-[#B4C0BB]/70 transition-all duration-300 select-none">
                      <div className="flex items-center justify-between text-[#F5F7F6] mb-1 border-b border-[#1A2824]/50 pb-1 font-semibold">
                        <span>PR #148: AST Optimizer fix</span>
                        <span className="text-env-blue font-bold">● MERGING</span>
                      </div>
                      <div className="space-y-0.5 text-[#B4C0BB]/50">
                        <div className="text-env-green/80">+ 42 lines code</div>
                        <div className="text-rose-400/80">- 12 lines code</div>
                        <div>Reviewers: Elena, Tariq, Kaelen</div>
                      </div>
                    </div>
                  )}
                  {idx === 2 && (
                    <div className="mt-5 p-3 rounded-lg bg-[#0B1210] border border-[#1A2824] group-hover:border-env-gold/20 font-mono text-[9px] text-[#B4C0BB]/70 transition-all duration-300 select-none">
                      <div className="flex items-center justify-between text-[#F5F7F6] mb-1 border-b border-[#1A2824]/50 pb-1 font-semibold">
                        <span>production-edge-routing</span>
                        <span className="text-env-gold font-bold">● LIVE 99.9%</span>
                      </div>
                      <div className="text-[#B4C0BB]/50 space-y-0.5">
                        <div>GET /api/v1/compiler-proofs - 200 OK (8ms)</div>
                        <div>POST /api/v1/register - 201 Created (14ms)</div>
                        <div>Active sockets: 1,482 open connections</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-[#D2DDD7] flex items-center justify-between font-mono text-[10px] text-[#4F625A] group-hover:text-[#050807] transition-colors">
                  <span>PILLAR // 0{idx + 1}</span>
                  <span className={`w-1.5 h-1.5 rounded-full bg-[#D2DDD7] ${
                    idx === 0
                      ? "group-hover:bg-env-green group-hover:shadow-[0_0_8px_var(--color-env-green)]"
                      : idx === 1
                        ? "group-hover:bg-env-blue group-hover:shadow-[0_0_8px_var(--color-env-blue)]"
                        : "group-hover:bg-env-gold group-hover:shadow-[0_0_8px_var(--color-env-gold)]"
                  }`} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
