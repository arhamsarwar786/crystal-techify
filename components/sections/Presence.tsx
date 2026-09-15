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
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="United States presence"
          description="Founded in 2021. Based in Dublin, Ohio — one US location, one engineering standard."
          detailHref={detailHref}
        />

        <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
          <MapPin className="h-4 w-4 text-brand-orange" />
          Dublin, Ohio · United States
        </p>

        <Reveal
          stagger
          className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-3 lg:grid-cols-5"
        >
          {PRESENCE_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={revealItem}
              className="card-on-muted"
            >
              <p className="font-sans text-2xl font-semibold tracking-tight text-ink">
                <CountUp value={stat.value} start />
              </p>
              <p className="mt-1 text-sm text-ink/50">{stat.label}</p>
            </motion.div>
          ))}
        </Reveal>

        <Reveal
          stagger
          className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {JOURNEY.map((step) => (
            <motion.div
              key={step.title}
              variants={revealItem}
              className="card-on-muted"
            >
              <step.icon className="h-5 w-5 text-brand-orange" />
              <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {step.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
