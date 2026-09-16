"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";
import { useLocale } from "@/lib/i18n";

export function Snapshot() {
  const { t } = useLocale();
  const statsRef = useRef<HTMLDListElement>(null);
  const shown = useInView(statsRef, { once: true, margin: "-80px", amount: 0.35 });

  return (
    <section
      id="snapshot"
      aria-labelledby="snapshot-heading"
      className="relative scroll-mt-24 overflow-hidden bg-[#0a0a0a] py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 fx-tech-grid-dark opacity-80"
      />
      <div aria-hidden className="fx-scan motion-safe:animate-scan-line" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl"
      />

      <div className="section-shell relative">
        <Reveal className="max-w-3xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-orange">
            02 · {t.snapshot.kicker}
          </p>
          <h2
            id="snapshot-heading"
            className="mt-3 font-sans text-[1.85rem] font-semibold tracking-tight text-white sm:text-[2.35rem]"
          >
            {t.snapshot.title}
          </h2>
          <span aria-hidden className="heading-accent" />
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-[15px]">
            {t.snapshot.description}
          </p>
        </Reveal>

        <dl
          ref={statsRef}
          className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4"
        >
          {t.snapshot.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
              className="group bg-[#0a0a0a] px-5 py-9 text-left transition-colors duration-500 hover:bg-white/[0.04] sm:px-7 sm:py-11"
            >
              <dt className="font-sans text-4xl font-semibold tracking-tight text-white transition-colors duration-500 group-hover:text-brand-orange sm:text-5xl lg:text-[3.25rem]">
                {stat.animate ? (
                  <CountUp value={stat.value} start={shown} />
                ) : (
                  stat.value
                )}
              </dt>
              <dd className="mt-3 max-w-[10rem] text-xs leading-snug text-white/45 sm:text-sm">
                {stat.label}
              </dd>
            </motion.div>
          ))}
        </dl>

        <Reveal delay={0.1} className="mt-12 max-w-3xl sm:mt-14">
          <p className="text-sm leading-relaxed text-white/60 sm:text-[15px]">
            {t.snapshot.commitment}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-[15px]">
            {t.snapshot.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
