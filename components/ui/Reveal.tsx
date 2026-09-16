"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** stagger children that use the exported `revealItem` variants */
  stagger?: boolean;
  id?: string;
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

const single = (delay: number, y: number): Variants => ({
  hidden: { opacity: 0, y, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, delay, ease: EASE },
  },
});

const group = (delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: delay },
  },
});

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  stagger = false,
  id,
}: RevealProps) {
  const { ref, shown } = useReveal();
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      variants={stagger ? group(delay) : single(delay, y)}
      initial={false}
      animate={reduce || shown ? "visible" : "hidden"}
      data-shown={reduce || shown ? "true" : undefined}
    >
      {children}
    </motion.div>
  );
}
