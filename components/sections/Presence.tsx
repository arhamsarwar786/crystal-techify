"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { BandDecor } from "@/components/ui/BandDecor";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPANY, JOURNEY, TRUST_METRICS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

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
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="Presence"
          title={t.presence.title}
          description={t.presence.description}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />

        <div className="card-on-muted card-static fx-spot relative mt-8 overflow-hidden sm:mt-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 fx-node-map opacity-90"
          />
          <p className="relative inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
            <MapPin className="h-3.5 w-3.5" />
            {t.presence.location}
          </p>
          <address className="relative mt-4 not-italic">
            <p className="font-sans text-lg font-semibold tracking-tight text-ink">
              {COMPANY.street}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink/70">
              {COMPANY.city}
              <br />
              {COMPANY.country}
            </p>
          </address>
        </div>

        <Reveal
          stagger
          className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
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
          {JOURNEY.map((step, i) => {
            return (
              <motion.div
                key={step.title}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-muted fx-spot"
              >
                <span className="icon-chip">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                  {t.journey[i]?.title ?? step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                  {t.journey[i]?.description ?? step.description}
                </p>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
