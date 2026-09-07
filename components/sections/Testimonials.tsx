"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6500);
    return () => clearInterval(timer);
  }, [paginate]);

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-64 w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-orange/10 blur-[120px] sm:h-80 sm:w-[40rem] sm:blur-[150px]"
      />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Client Feedback"
          title={
            <>
              Trusted by founders and{" "}
              <span className="gradient-text">operators</span>
            </>
          }
        />

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-14">
          <div className="glass-strong gradient-border relative min-h-[16rem] overflow-hidden rounded-2xl p-6 sm:min-h-[19rem] sm:rounded-3xl sm:p-10">
            <Quote className="h-8 w-8 text-brand-orange/50 sm:h-9 sm:w-9" />
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={mounted ? { opacity: 0, x: direction * 40 } : false}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4 }}
                className="mt-3 sm:mt-4"
              >
                <p className="text-base leading-relaxed text-ink/85 sm:text-xl">
                  “{current.quote}”
                </p>
                <footer className="mt-5 flex items-center gap-3 sm:mt-6">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-gradient text-sm font-bold text-obsidian">
                    {current.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">
                      {current.name}
                    </span>
                    <span className="block text-xs text-ink/55">
                      {current.role === current.company
                        ? current.company
                        : `${current.role} · ${current.company}`}
                    </span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-ink/5 text-ink/70 transition-colors hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className="grid h-8 place-items-center px-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      i === index
                        ? "w-6 bg-brand-gradient"
                        : "w-1.5 bg-ink/20 hover:bg-ink/40"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-ink/5 text-ink/70 transition-colors hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
