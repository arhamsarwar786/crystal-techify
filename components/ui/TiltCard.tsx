"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * Interactive 3D tilt card with a glow that tracks the cursor.
 * On touch / coarse-pointer devices it renders as a plain static card —
 * no tilt, no perspective, no z-translation — so nothing clips on mobile.
 */
export function TiltCard({ children, className, intensity = 8 }: TiltCardProps) {
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setInteractive(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const intensitySafe = Math.min(intensity, 5);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const glow = useMotionTemplate`radial-gradient(280px circle at ${glowX}% ${glowY}%, rgba(255,120,60,0.18), transparent 70%)`;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * intensitySafe * 2);
    rotateX.set((0.5 - py) * intensitySafe * 2);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  if (!interactive) {
    return (
      <div className={`group relative rounded-2xl ${className ?? ""}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative rounded-2xl [transform-style:preserve-3d] ${className ?? ""}`}
    >
      <motion.span
        aria-hidden
        style={{ background: glow }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
