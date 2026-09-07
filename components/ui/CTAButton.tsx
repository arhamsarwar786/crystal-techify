"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { MouseEvent, ReactNode, Ref } from "react";
import { useRef, useState } from "react";

interface CTAButtonProps {
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  /** Renders an <a>. Omit this and pass `onClick` to render a <button> instead (e.g. to open a modal/popup). */
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  "aria-label"?: string;
}

type MagnetElement = HTMLAnchorElement | HTMLButtonElement;

/** Subtle magnetic pull toward the cursor — reads as premium, not gimmicky. */
function useMagnetic(strength = 0.28) {
  const ref = useRef<MagnetElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const [interactive, setInteractive] = useState(false);

  const onMouseMove = (event: MouseEvent<MagnetElement>) => {
    if (
      interactive === false &&
      typeof window !== "undefined" &&
      window.matchMedia &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseEnter = () => setInteractive(true);
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseEnter, onMouseLeave };
}

export function CTAButton({
  children,
  variant = "solid",
  className,
  href,
  target,
  rel,
  onClick,
  ...rest
}: CTAButtonProps) {
  const magnet = useMagnetic();
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-[12px] font-normal tracking-[0.12em] transition-[background-color,box-shadow,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60";

  const variantClass =
    variant === "outline"
      ? `${base} gradient-border border border-ink/15 bg-ink/5 text-ink backdrop-blur hover:bg-ink/10 hover:shadow-glow-sm ${className ?? ""}`
      : `${base} overflow-hidden bg-brand-gradient bg-[length:200%_100%] text-obsidian hover:animate-gradient-x hover:shadow-glow ${className ?? ""}`;

  const content =
    variant === "outline" ? (
      children
    ) : (
      <>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {/* sheen sweep — always a light highlight, it rides the orange gradient */}
        <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
      </>
    );

  const shared = {
    style: { x: magnet.x, y: magnet.y },
    onMouseMove: magnet.onMouseMove,
    onMouseEnter: magnet.onMouseEnter,
    onMouseLeave: magnet.onMouseLeave,
    onClick,
    className: variantClass,
    ...rest,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        ref={magnet.ref as Ref<HTMLAnchorElement>}
        {...shared}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      ref={magnet.ref as Ref<HTMLButtonElement>}
      {...shared}
    >
      {content}
    </motion.button>
  );
}
