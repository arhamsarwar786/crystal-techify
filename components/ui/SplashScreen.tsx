"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Welcome / loading overlay shown when the site is first opened.
 *
 * It renders on the very first paint (state starts `true`, so it's in the
 * server HTML and covers the page before any content shows), fills a slim
 * brand-gradient progress line, then is removed to reveal the page. No fade in
 * or out — it just appears and disappears; only the progress line animates.
 *
 * Gated on sessionStorage and marked "seen" the moment it mounts, so a reload —
 * even one mid-animation — doesn't replay it. Shows again only in a fresh
 * tab/window. Skipped under browser automation, with a hard ceiling so it can
 * never trap the page.
 */
const BAR_MS = 2000;
const CEILING_MS = 4500;
const STORAGE_KEY = "ct-welcome-seen";

const BADGES = [
  {
    icon: Award,
    title: "On Top Charts",
    year: "2023",
    sub: "Top Blockchain Consulting Company",
  },
  {
    icon: ShieldCheck,
    title: "ISO Certified",
    year: "27001",
    sub: "ISO 27001:2013 — Certified by RICI",
  },
  {
    icon: Star,
    title: "Top Rated Plus",
    year: "2023",
    sub: 'Ranked "Top Rated Plus" on Upwork',
  },
];

export function SplashScreen() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(true);
  const [barDone, setBarDone] = useState(false);

  useEffect(() => {
    // Automation (Playwright/Puppeteer/etc.) — skip so screenshots aren't
    // stuck behind the overlay and don't burn the "seen" flag.
    if (navigator.webdriver) {
      setShow(false);
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      /* storage unavailable — show it once */
    }
    if (seen) {
      setShow(false);
      return;
    }

    // Mark seen up front: a reload mid-animation must not replay the splash.
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (show && barDone) setShow(false);
  }, [show, barDone]);

  // Safety net: never trap the page (headless browsers, failed asset loads).
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), CEILING_MS);
    return () => clearTimeout(t);
  }, [show]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* faint hex-network texture — brightest toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
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
        <div className="w-[min(74vw,380px)]">
          <Image
            src="/brand/lockup-light.png"
            alt="Crystal Techify"
            width={750}
            height={632}
            priority
            unoptimized
            className="h-auto w-full"
          />
        </div>

        {/* award / credential row */}
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {BADGES.map(({ icon: Icon, title, year, sub }) => (
            <li key={title} className="flex items-center gap-2.5">
              <span className="grid h-9 w-8 place-items-center rounded-md bg-gradient-to-b from-brand-red to-brand-orange text-white shadow-sm [clip-path:polygon(0_0,100%_0,100%_72%,50%_100%,0_72%)]">
                <Icon className="h-4 w-4" strokeWidth={2.4} />
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[11px] font-bold tracking-wide text-neutral-800">
                  {title} <span className="text-brand-red">{year}</span>
                </span>
                <span className="block max-w-[9.5rem] text-[10px] text-neutral-500">
                  {sub}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {/* loading line */}
        <div className="relative mt-11 h-[3px] w-[min(56vw,220px)] overflow-hidden rounded-full bg-black/10">
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
