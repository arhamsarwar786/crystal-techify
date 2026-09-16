"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Homepage-only scroll chrome: a top progress line, a right-hand rail, and
 * two slow parallax glows. Hidden entirely when the user prefers reduced motion.
 */
export function HomeScrollFX() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.2,
  });
  const rail = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.25,
  });
  const orbA = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const orbB = useTransform(scrollYProgress, [0, 1], [0, -200]);

  if (reduce) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brand-orange"
        style={{ scaleX }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed right-5 top-[28vh] z-40 hidden h-[42vh] w-px lg:block"
      >
        <div className="absolute inset-0 bg-ink/10" />
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-brand-orange shadow-[0_0_12px_rgba(255,107,26,0.7)]"
          style={{ scaleY: rail, height: "100%" }}
        />
      </div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -left-32 top-[30%] z-0 h-72 w-72 rounded-full bg-brand-orange/[0.09] blur-3xl"
        style={{ y: orbA }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -right-24 bottom-[18%] z-0 h-80 w-80 rounded-full bg-brand-orange/[0.06] blur-3xl"
        style={{ y: orbB }}
      />
    </>
  );
}
