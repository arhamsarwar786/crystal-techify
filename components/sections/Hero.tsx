"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { EASE } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";

const HERO_VIDEOS = [
  "/hero/14684324_1280_720_30fps.mp4",
  "/hero/15439669-hd_1278_720_30fps.mp4",
  "/hero/18458403-hd_1280_720_24fps.mp4",
] as const;

const CLIP_MS = 5000;

const NON_LATIN = new Set(["ar", "th", "zh"]);

function HeroReel({
  index,
  reduce,
}: {
  index: number;
  reduce: boolean | null;
}) {
  const refs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([
    null,
    null,
  ]);
  const [front, setFront] = useState(0);
  const [layers, setLayers] = useState<[string, string]>([
    HERO_VIDEOS[0],
    HERO_VIDEOS[1],
  ]);
  const indexRef = useRef(index);

  useEffect(() => {
    if (indexRef.current === index) {
      const video = refs.current[front];
      if (video && !reduce) video.play().catch(() => {});
      return;
    }
    indexRef.current = index;
    const next = 1 - front;
    setLayers((current) => {
      const copy: [string, string] = [...current];
      copy[next] = HERO_VIDEOS[index];
      return copy;
    });
    const id = window.setTimeout(() => setFront(next), 40);
    return () => window.clearTimeout(id);
  }, [index, front, reduce]);

  useEffect(() => {
    refs.current.forEach((video, i) => {
      if (!video) return;
      if (!reduce && i === front) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [front, layers, reduce]);

  return (
    <>
      {layers.map((src, i) => (
        <video
          key={`${i}-${src}`}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-hidden
          muted
          playsInline
          loop
          preload="auto"
          src={src}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            i === front ? "z-[1] opacity-100" : "z-0 opacity-0"
          }`}
        />
      ))}
    </>
  );
}

export function Hero() {
  const { t, locale } = useLocale();
  const reduce = useReducedMotion();
  const headingFont = NON_LATIN.has(locale)
    ? "font-sans font-semibold tracking-normal"
    : "font-sans font-semibold tracking-tight";
  const slides = t.heroSlides;
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0];
  const count = HERO_VIDEOS.length;

  const go = (dir: -1 | 1) => {
    setIndex((current) => (current + dir + count) % count);
  };

  useEffect(() => {
    if (reduce) return;
    const id = window.setTimeout(() => {
      setIndex((current) => (current + 1) % count);
    }, CLIP_MS);
    return () => window.clearTimeout(id);
  }, [reduce, index, count]);

  const chevronClass =
    "absolute top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-black/55";

  return (
    <section id="top" className="relative bg-black">
      <div className="relative mt-[4.5rem] flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden sm:mt-[5.25rem] sm:min-h-[calc(100svh-5.25rem)]">
        <div aria-hidden className="absolute inset-0">
          <HeroReel index={index} reduce={reduce} />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 z-[2] bg-gradient-to-r from-black via-black/65 to-transparent lg:via-black/40"
        />
        <div
          aria-hidden
          className="absolute inset-0 z-[2] bg-gradient-to-t from-black/75 via-transparent to-black/25"
        />

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className={`${chevronClass} left-3 sm:left-5 lg:left-8`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className={`${chevronClass} right-3 sm:right-5 lg:right-8`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="section-shell relative z-10 flex flex-1 items-center pb-16 pt-12 sm:pt-16">
          <div className="max-w-2xl text-left">
            <h1
              className={`${headingFont} text-[2rem] leading-[1.14] [text-wrap:pretty] sm:text-[2.75rem] sm:leading-[1.12] lg:text-[3.15rem] lg:leading-[1.1]`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={slide.title}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="block"
                >
                  <span className="block font-medium text-brand-orange">{slide.title}</span>
                  <span className="mt-2 block font-medium text-white/90">{slide.body}</span>
                </motion.span>
              </AnimatePresence>
            </h1>

            <div className="mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 font-sans text-sm font-semibold tracking-[0.04em] text-white transition-colors duration-300 hover:bg-brand-orange/90"
              >
                {t.common.getInTouch}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div
              className="mt-8 flex items-center gap-2"
              role="tablist"
              aria-label="Hero slides"
            >
              {HERO_VIDEOS.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-8 bg-brand-orange"
                      : "w-3 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
