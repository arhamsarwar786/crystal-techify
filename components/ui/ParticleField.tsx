"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

/**
 * Logo-dispersion effect: crystalline shards drifting upward, echoing the
 * fragmenting Crystal Techify mark. Deterministic seed keeps SSR/CSR in sync.
 */
export function ParticleField({ count = 22, className }: ParticleFieldProps) {
  const shards = useMemo(() => {
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rand() * 100,
      size: 4 + rand() * 10,
      delay: rand() * 6,
      duration: 7 + rand() * 9,
      rotate: rand() * 360,
      opacity: 0.12 + rand() * 0.35,
    }));
  }, [count]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {shards.map((s) => (
        <motion.span
          key={s.id}
          className="absolute bg-brand-gradient"
          style={{
            left: `${s.left}%`,
            bottom: "-10%",
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          }}
          animate={{
            y: ["0%", "-780%"],
            rotate: [s.rotate, s.rotate + 220],
            opacity: [0, s.opacity, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
