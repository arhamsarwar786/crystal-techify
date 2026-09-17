"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Site-wide scroll chrome: a hairline progress bar under the header.
 * Hidden entirely when the user prefers reduced motion.
 */
export function HomeScrollFX() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px origin-left bg-brand-orange"
      style={{ scaleX }}
    />
  );
}
