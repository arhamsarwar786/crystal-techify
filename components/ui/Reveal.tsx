"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
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

const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const single = (delay: number, y: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  },
});

const group = (delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: delay },
  },
});

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  stagger = false,
  id,
}: RevealProps) {
  const { ref, shown } = useReveal();

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      variants={stagger ? group(delay) : single(delay, y)}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
