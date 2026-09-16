"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JOURNEY, TRUST_METRICS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

export function Presence({ detailHref }: { detailHref?: string }) {
  const { t } = useLocale();
  const labels = t.trust;
  const presenceStats = [
    ...TRUST_METRICS.map((stat, i) => ({
      ...stat,
      label: labels[i] ?? stat.label,
    })),
    {
      icon: TRUST_METRICS[0].icon,
      value: "50+",
      label: labels[TRUST_METRICS.length] ?? t.presence.extraStat,
    },
  ];
  return (
    <section
      id="presence"
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title={t.presence.title}
          description={t.presence.description}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />

        <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
          <MapPin className="h-4 w-4 text-brand-orange" />
          {t.presence.location}
        </p>

        <Reveal
          stagger
          className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-3 lg:grid-cols-5"
        >
          {presenceStats.map((stat) => (
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
          {JOURNEY.map((step, i) => (
            <motion.div
              key={step.title}
              variants={revealItem}
              className="card-on-muted"
            >
              <step.icon className="h-5 w-5 text-brand-orange" />
              <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                {t.journey[i]?.title ?? step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {t.journey[i]?.description ?? step.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
