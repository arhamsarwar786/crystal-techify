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
import { EASE } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";
import { type MouseEvent } from "react";

const HERO_VIDEO = "/hero/8084499-uhd_3840_2160_25fps.mp4";

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

function HeroReel({ reduce }: { reduce: boolean | null }) {
  return (
    <video
      aria-hidden
      muted
      playsInline
      loop={!reduce}
      autoPlay={!reduce}
      preload={reduce ? "metadata" : "auto"}
      src={HERO_VIDEO}
      className="absolute inset-0 h-full w-full object-cover object-[78%_center]"
    />
  );
}

const NON_LATIN = new Set(["ar", "th", "zh"]);

export function Hero() {
  const { t, locale } = useLocale();
  const reduce = useReducedMotion();
  const headingFont = NON_LATIN.has(locale)
    ? "font-sans font-semibold tracking-normal"
    : "font-sans font-semibold tracking-tight";

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const imgX = useSpring(useTransform(mx, [0, 1], [12, -12]), {
    stiffness: 50,
    damping: 22,
  });
  const imgY = useSpring(useTransform(my, [0, 1], [8, -8]), {
    stiffness: 50,
    damping: 22,
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
    <section id="top" className="relative bg-black" onMouseMove={onMove}>
      <div className="relative mt-[4.5rem] flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden sm:mt-[5.25rem] sm:min-h-[calc(100svh-5.25rem)]">
        <motion.div
          aria-hidden
          className="absolute inset-0"
          // style={reduce ? undefined : { x: imgX, y: imgY }}
        >
          <HeroReel reduce={reduce} />
        </motion.div>

        {/* <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent lg:via-black/40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
        /> */}

        {/* <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 inset-y-0 hidden sm:block lg:inset-x-8"
        > */}
          {/* <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-brand-orange/40" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-white/20" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-white/20" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-brand-orange/40" /> */}
        {/* </div> */}

        <div className="section-shell relative z-10 flex flex-1 items-center pb-16 pt-12 sm:pt-16">
          <motion.div
            variants={container}
            initial={reduce ? false : "hidden"}
            animate="visible"
            className="max-w-2xl text-left"
          >
            <motion.h1
              variants={item}
              className={`${headingFont} text-[2rem] leading-[1.14] [text-wrap:pretty] sm:text-[2.75rem] sm:leading-[1.12] lg:text-[3.15rem] lg:leading-[1.1]`}
            >
              <span className="block text-brand-orange">{t.heroTitle}</span>
              <span className="mt-2 block text-white/90">{t.heroBody}</span>
            </motion.h1>

            <motion.div variants={item} className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 font-sans text-sm font-semibold tracking-[0.04em] text-white transition-colors duration-300 hover:bg-brand-orange/90"
              >
                {t.common.getInTouch}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
