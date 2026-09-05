"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, CalendarClock, Sparkles } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Marquee } from "@/components/ui/Marquee";
import { ParticleField } from "@/components/ui/ParticleField";
import { TRUST_METRICS, COMPANY, TECH_STACK } from "@/lib/data";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-40"
    >
      <div aria-hidden className="absolute inset-0 grid-backdrop" />
      <div
        aria-hidden
        className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-red/20 blur-[100px] animate-glow-pulse sm:h-[32rem] sm:w-[32rem] sm:blur-[130px]"
      />
      <div
        aria-hidden
        className="absolute right-0 top-52 h-56 w-56 rounded-full bg-brand-orange/20 blur-[100px] animate-glow-pulse sm:right-[8%] sm:h-72 sm:w-72 sm:blur-[120px]"
      />
      <ParticleField className="opacity-70" />

      <div className="section-shell relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65 backdrop-blur sm:px-4 sm:text-xs sm:tracking-[0.22em]"
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
            Dublin, Ohio · Global Delivery
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-[1.75rem] font-semibold leading-[1.12] sm:mt-7 sm:text-5xl sm:leading-[1.08] md:text-6xl"
          >
            Empowering businesses to weave the{" "}
            <span className="gradient-text text-glow">future of software</span>,
            seamlessly together.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink/60 sm:mt-6 sm:text-lg"
          >
            We&apos;re a senior AI &amp; software engineering team that has
            shipped <span className="text-ink">500+ products</span> for founders
            and enterprises — the messy, ambitious ones included.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center"
          >
            <CTAButton href="#contact" className="w-full sm:w-auto">
              <CalendarClock className="h-4 w-4" />
              Book Free Consultation
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
        </motion.div>

        {/* Trust metrics bar */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-2.5 sm:mt-16 sm:gap-4 lg:grid-cols-4"
        >
          {TRUST_METRICS.map((metric) => (
            <motion.div
              key={metric.label}
              variants={item}
              className="glass gradient-border rounded-xl p-3.5 text-left transition-transform duration-300 hover:-translate-y-1 sm:rounded-2xl sm:p-4"
            >
              <metric.icon className="h-5 w-5 text-brand-orange" />
              <p className="mt-2.5 font-display text-base font-semibold text-ink sm:mt-3 sm:text-lg">
                {metric.value}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-ink/55 sm:text-xs">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 max-w-6xl sm:mt-12">
          <p className="mb-3 text-center text-[11px] uppercase tracking-[0.24em] text-ink/35 sm:text-xs">
            Engineering with a modern stack
          </p>
          <Marquee
            speed="slow"
            items={TECH_STACK.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          />
        </div>
      </div>
    </section>
  );
}
