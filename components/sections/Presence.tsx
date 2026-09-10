"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOURNEY, TRUST_METRICS } from "@/lib/data";

const PRESENCE_STATS = [
  ...TRUST_METRICS,
  {
    icon: TRUST_METRICS[0].icon,
    value: "50+",
    label: "Supported technologies",
  },
];

export function Presence({ detailHref }: { detailHref?: string }) {
  return (
    <section
      id="presence"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Overview"
          detailHref={detailHref}
          title={
            <>
              Our United States{" "}
              <span className="gradient-text">presence</span>
            </>
          }
          description="Founded in 2021. Based in Dublin, Ohio — one US location, one engineering standard."
        />

        <div className="mx-auto mt-10 flex max-w-xl items-center justify-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <MapPin className="h-5 w-5 text-brand-red" />
            Dublin, Ohio · United States
          </div>
        </div>

        <Reveal
          stagger
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-3 lg:grid-cols-5"
        >
          {PRESENCE_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={revealItem}
              className="glass gradient-border rounded-2xl p-4 text-center"
            >
              <p className="font-display text-lg tracking-[0.06em] text-ink sm:text-xl">
                <CountUp value={stat.value} start />
              </p>
              <p className="mt-1 text-[11px] leading-snug text-ink/55 sm:text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </Reveal>

        <Reveal
          stagger
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {JOURNEY.map((step) => (
            <motion.div
              key={step.title}
              variants={revealItem}
              className="glass rounded-2xl p-5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink/5 text-brand-orange">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-semibold leading-snug text-ink sm:text-base">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
