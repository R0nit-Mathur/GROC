"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../motion/motion-primitives";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "What exactly is GROC?",
    answer: "GROC (Geek Room Open Code) is a long-term open-source developer ecosystem, not a temporary hackathon or basic bootcamp. It functions as India's open-source talent pipeline, where builders collaborate on production-ready systems, curators lead community modules, and technology companies recruit verified engineering talent directly from their contribution graphs."
  },
  {
    question: "How does the curator-led growth model work?",
    answer: "Our ecosystem operates on a Repository-to-Community model. Experienced industry engineers act as Curators who design system architectures and oversee repository modules. Contributors join these repositories to write code, and Curators perform detailed, high-standard code reviews. Over time, active contributors step into leadership roles and become curators themselves, making the ecosystem compound dynamically."
  },
  {
    question: "How does talent discovery work through GROC?",
    answer: "Traditional resumes are highly prone to inflation. GROC replaces them with compiled proof. Companies looking for engineering talent can inspect the exact commit history, pull request descriptions, system performance metrics (e.g., query speeds, compiler optimizations), and curator reviews of our builders. This ensures that every developer is measured by what they actually deploy."
  },
  {
    question: "Is GROC open to beginners?",
    answer: "Yes, but with a strong emphasis on self-directed learning and repetition. While we do not host hand-holding tutorials, we provide detailed architectural design templates and curator-reviewed code feedback. Every builder starts with a blank canvas (Day 01) and grows their skillset through consistent shipping and peer interaction."
  },
  {
    question: "Are all GROC repositories open-source and community-owned?",
    answer: "Yes, 100%. All repositories within the GROC network are fully open-source and community-owned. Builders retain full credit for their contributions, and their verifiable code histories remain accessible publicly as permanent proof-of-work credentials."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-28 md:py-36 px-6 bg-env-primary border-t border-[#162722] overflow-hidden flex flex-col items-center">
      {/* Dynamic ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-brand-green/5 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="w-full max-w-4xl z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn direction="up" delay={0.1}>
            <span className="font-mono text-xs text-brand-green uppercase tracking-widest font-semibold">
              // FAQ & Resources
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} className="mt-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-env-text-primary leading-tight">
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.3} className="mt-4 max-w-xl mx-auto text-env-text-secondary">
            Everything you need to know about the curator model, contributions, and verified talent discovery.
          </FadeIn>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeIn 
                key={idx}
                direction="up" 
                delay={0.05 * (idx + 1)}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? "border-brand-green/30 bg-env-surface/60 shadow-[0_4px_25px_rgba(74,222,128,0.02)]" 
                    : "border-[#162722] bg-env-surface/20 hover:border-zinc-800"
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                      isOpen ? "text-brand-green" : "text-zinc-500 group-hover:text-zinc-300"
                    }`} />
                    <span className={`text-sm md:text-base font-bold font-display transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-[#B4C0BB] group-hover:text-white"
                    }`}>
                      {item.question}
                    </span>
                  </div>

                  <div className={`p-1.5 rounded-full border transition-all duration-300 ${
                    isOpen 
                      ? "border-brand-green bg-brand-green text-black" 
                      : "border-zinc-800 bg-[#0B1210] text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-700"
                  }`}>
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>

                {/* Collapsible Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: "easeOut" },
                          opacity: { duration: 0.25, delay: 0.1 }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: "easeIn" },
                          opacity: { duration: 0.2 }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-env-text-secondary leading-relaxed font-sans border-t border-white/[0.03]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
};
