"use client";

import React from "react";
import { FadeIn } from "../motion/motion-primitives";

export const TransitionSection: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-6 py-32 bg-env-primary overflow-hidden">
      {/* Dark forest atmospheric gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-env-forest)/15_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl text-center flex flex-col items-center z-10">
        <FadeIn direction="up" delay={0.1} duration={0.9} distance={15}>
          <p className="font-mono text-env-text-secondary/60 text-xs tracking-widest uppercase mb-10">
            // the fundamental truth
          </p>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.3} duration={1.2} distance={20} className="max-w-3xl">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-env-text-primary leading-normal">
            Building isn&apos;t talent. <br />
            <span className="text-env-green drop-shadow-[0_0_20px_rgba(74,222,128,0.15)]">
              It&apos;s repetition.
            </span>
          </h2>
        </FadeIn>

        <FadeIn direction="up" delay={0.6} duration={1.0} distance={10} className="mt-12">
          <div className="w-[1px] h-16 bg-gradient-to-b from-env-green/30 to-transparent" />
        </FadeIn>
      </div>
    </section>
  );
};
