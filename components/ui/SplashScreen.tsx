"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * First-visit overlay: the crystal C lands, then the rest of "Crystal"
 * draws in. No credential badges.
 */
const BAR_MS = 2400;
const CEILING_MS = 5000;
const STORAGE_KEY = "ct-welcome-seen";

export function SplashScreen() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const [barDone, setBarDone] = useState(false);

  useEffect(() => {
    if (navigator.webdriver) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* storage unavailable — show it once */
    }
    if (seen) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setShow(true);
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (show && barDone) setShow(false);
  }, [show, barDone]);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), CEILING_MS);
    return () => clearTimeout(t);
  }, [show]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  if (!show) return null;

  const instant = Boolean(reduceMotion);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='96' viewBox='0 0 56 96'%3E%3Cpath fill='none' stroke='%23FF7A45' stroke-width='1' d='M28 0l24 14v28L28 56 4 42V14zM28 56l24 14v28M28 56L4 70v28'/%3E%3C/svg%3E\")",
          backgroundSize: "56px 96px",
          WebkitMaskImage:
            "radial-gradient(ellipse 62% 58% at 50% 46%, transparent 32%, #000 100%)",
          maskImage:
            "radial-gradient(ellipse 62% 58% at 50% 46%, transparent 32%, #000 100%)",
        }}
      />

      <div className="relative flex flex-col items-center px-6">
        <h1 className="flex items-baseline font-display text-[clamp(2.8rem,12vw,5.5rem)] leading-none tracking-[0.08em] text-ink">
          <motion.span
            initial={instant ? false : { opacity: 0, scale: 0.55, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="gradient-text text-glow"
          >
            C
          </motion.span>
          <motion.span
            initial={instant ? false : { opacity: 0, x: -18, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.65,
              delay: instant ? 0 : 0.55,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="inline-flex"
          >
            rystal
          </motion.span>
        </h1>
        <motion.p
          initial={instant ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: instant ? 0 : 1.05, duration: 0.45 }}
          className="mt-3 font-display text-[11px] uppercase tracking-[0.42em] text-ink/45 sm:text-xs"
        >
          Techify
        </motion.p>

        <div className="relative mt-12 h-[3px] w-[min(56vw,220px)] overflow-hidden rounded-full bg-ink/10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reduceMotion ? 0 : BAR_MS / 1000,
              ease: "linear",
            }}
            onAnimationComplete={() => setBarDone(true)}
            style={{ transformOrigin: "0% 50%" }}
            className="h-full w-full rounded-full bg-gradient-to-r from-brand-red to-brand-orange"
          />
        </div>
      </div>
    </div>
  );
}
