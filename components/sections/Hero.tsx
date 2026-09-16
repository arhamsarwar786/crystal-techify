"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { openCalendly } from "@/lib/calendly";
import { EASE } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";
import { Typewriter } from "@/components/ui/Typewriter";
import { type MouseEvent } from "react";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.16 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const NON_LATIN = new Set(["ar", "th", "zh"]);

export function Hero() {
  const { t, locale } = useLocale();
  const reduce = useReducedMotion();
  const headingFont = NON_LATIN.has(locale)
    ? "font-sans font-semibold tracking-normal"
    : "font-sans font-semibold tracking-tight";

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const videoX = useSpring(useTransform(mx, [0, 1], [16, -16]), {
    stiffness: 50,
    damping: 22,
  });
  const videoY = useSpring(useTransform(my, [0, 1], [10, -10]), {
    stiffness: 50,
    damping: 22,
  });
  const glowX = useSpring(useTransform(mx, [0, 1], ["18%", "38%"]), {
    stiffness: 40,
    damping: 24,
  });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    mx.set(event.clientX / window.innerWidth);
    my.set(event.clientY / window.innerHeight);
  };

  return (
    <section
      id="top"
      className="relative bg-black"
      onMouseMove={onMove}
    >
      <div className="relative flex min-h-[100svh] flex-col overflow-hidden">
        <motion.video
          className="absolute inset-[-4%] h-[108%] w-[108%] object-cover opacity-95 [filter:brightness(0.88)_contrast(1.12)_saturate(1.05)]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          style={reduce ? undefined : { x: videoX, y: videoY }}
        >
          <source src="/hero/background.mp4" type="video/mp4" />
        </motion.video>

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/10"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50"
        />
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: reduce
              ? "radial-gradient(ellipse at 22% 48%, rgba(255,107,26,0.16), transparent 48%)"
              : undefined,
          }}
        >
          {!reduce && (
            <motion.div
              className="absolute top-[20%] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-orange/20 blur-[90px]"
              style={{ left: glowX }}
            />
          )}
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-[5.25rem] hidden h-[calc(100%-7.5rem)] sm:block lg:inset-x-8"
        >
          <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-brand-orange/40" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-white/20" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-white/20" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-brand-orange/40" />
        </div>

        <div className="section-shell relative z-10 flex flex-1 items-center pb-24 pt-28 sm:pt-32">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="max-w-2xl text-left"
          >
              <motion.p
                variants={item}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-brand-orange motion-safe:animate-ping" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-brand-orange" />
                </span>
                Dublin, Ohio · ISO 27001
              </motion.p>

              <motion.h1
                variants={item}
                className={`text-[2.15rem] leading-[1.12] text-white [text-wrap:pretty] sm:text-5xl sm:leading-[1.1] lg:text-[3.65rem] lg:leading-[1.08] ${headingFont}`}
              >
                <span className="block">{t.heroTitle}</span>
                <Typewriter
                  key={locale}
                  words={t.heroWords}
                  className="mt-1 text-brand-orange"
                />
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-6 max-w-md font-sans text-base leading-relaxed text-white/75 sm:text-lg"
              >
                {t.heroBody}
              </motion.p>

              <motion.div
                variants={item}
                className="mt-9 flex flex-wrap items-center gap-3"
              >
                <button
                  type="button"
                  onClick={openCalendly}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-orange px-6 py-3.5 font-sans text-sm font-semibold text-white shadow-glow transition-transform duration-300 hover:scale-[1.03] hover:bg-brand-orange/90"
                >
                  <span className="relative z-10">{t.bookDemo}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full"
                  />
                </button>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white/10"
                >
                  {t.common.getInTouch}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
          </motion.div>
        </div>

        <div className="section-shell relative z-10 pb-7">
          <div className="flex items-end justify-between gap-6">
            <div className="hidden items-center gap-3 sm:flex">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                Scroll
              </span>
              <span className="h-px w-16 bg-gradient-to-r from-brand-orange to-transparent motion-safe:animate-line-grow" />
            </div>
            <div
              aria-hidden
              className="mx-auto flex flex-col items-center gap-2 sm:hidden"
            >
              <span className="h-8 w-px bg-gradient-to-b from-brand-orange to-transparent motion-safe:animate-scroll-cue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
