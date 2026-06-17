"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useInView, Variant } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  triggerOnce?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = "",
  triggerOnce = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-10% 0px -10% 0px" });

  const getDirectionOffset = () => {
    if (prefersReducedMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getDirectionOffset();

  const variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
        duration: duration,
        delay: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnce?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 0.5,
  stagger = 0.02,
  triggerOnce = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-5% 0px" });

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, idx) => (
        <span key={idx} className="mr-[0.25em] inline-block overflow-hidden py-[0.1em]">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};
