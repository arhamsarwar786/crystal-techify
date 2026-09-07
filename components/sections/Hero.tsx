"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarClock, ChevronDown } from "lucide-react";
import { BrandBackdrop } from "@/components/ui/BrandBackdrop";
import { CTAButton } from "@/components/ui/CTAButton";
import { CountUp } from "@/components/ui/CountUp";
import { openCalendly } from "@/lib/calendly";
import { TRUST_METRICS } from "@/lib/data";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const COVER_BADGES = [
  "Clutch · Top Blockchain Consulting",
  "ISO 27001:2013",
  "Upwork Top Rated Plus",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-6 pt-24 sm:pb-8 sm:pt-28"
    >
      <BrandBackdrop />
      <div
        aria-hidden
        className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-red/15 blur-[100px] sm:h-80 sm:w-80"
      />

      <div className="section-shell relative flex flex-1 flex-col justify-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-3 py-1 font-display text-[10px] font-normal uppercase tracking-[0.2em] text-ink/65 sm:px-3.5 sm:text-[11px] sm:tracking-[0.24em]"
          >
            Dublin, Ohio · USA &amp; Pakistan
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-4 text-[1.5rem] leading-[1.22] sm:mt-5 sm:text-[2.15rem] sm:leading-[1.2] md:text-[2.45rem]"
          >
            Empowering businesses to weave the{" "}
            <span className="gradient-text">future of software</span>,
            seamlessly together.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink/60 sm:mt-4 sm:text-base"
          >
            AI and advanced software from Dublin, Ohio.{" "}
            <span className="text-ink">500+ projects</span> worldwide.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-5 flex w-full flex-col items-stretch justify-center gap-2.5 sm:mt-6 sm:w-auto sm:flex-row sm:items-center"
          >
            <CTAButton onClick={openCalendly} className="w-full sm:w-auto">
              <CalendarClock className="h-4 w-4" />
              Book a Consultation
            </CTAButton>
            <CTAButton
              href="#portfolio"
              variant="outline"
              className="w-full sm:w-auto"
            >
              View Our Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CTAButton>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-5 text-[11px] leading-relaxed text-ink/45 sm:mt-6 sm:text-xs"
          >
            {COVER_BADGES.join("  ·  ")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-6 grid w-full max-w-4xl grid-cols-2 gap-2 sm:mt-8 sm:gap-3 lg:grid-cols-4"
        >
          {TRUST_METRICS.map((metric) => (
            <motion.div
              key={metric.label}
              variants={item}
              className="glass gradient-border rounded-xl px-3 py-3 text-left sm:px-4 sm:py-3.5"
            >
              <p className="font-display text-sm tracking-[0.08em] text-ink sm:text-base">
                <CountUp value={metric.value} start />
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-ink/55 sm:text-xs">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-5 hidden justify-center sm:mt-6 sm:flex"
        >
          <a
            href="#about"
            aria-label="Scroll to explore"
            className="grid h-8 w-8 place-items-center rounded-full border border-ink/10 text-ink/40 transition-colors hover:border-brand-orange/40 hover:text-ink"
          >
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
