"use client";

import { motion } from "framer-motion";
import { BandDecor } from "@/components/ui/BandDecor";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/data";
import { fmt, useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

export function Process({
  detailHref,
  pageStart = false,
}: {
  detailHref?: string;
  pageStart?: boolean;
}) {
  const { t } = useLocale();
  return (
    <section
      id="process"
      className={`band-muted relative scroll-mt-24 overflow-hidden pb-20 sm:pb-24 lg:pb-28 ${
        pageStart ? "pt-28 sm:pt-36" : "pt-20 sm:pt-24 lg:pt-28"
      }`}
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          title={t.process.title}
          description={t.process.description}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />

        <Reveal
          stagger
          className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROCESS_STEPS.map((step, i) => {
            const n = String(step.index).padStart(2, "0");
            return (
              <motion.div
                key={step.index}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-muted fx-spot flex h-full flex-col"
              >
                <span aria-hidden className="index-ghost">
                  {n}
                </span>
                <div className="flex items-start justify-between gap-3">
                  <span className="icon-chip">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <span className="font-sans text-[11px] font-semibold tracking-[0.18em] text-ink/30">
                    {n}
                  </span>
                </div>
                <h3 className="mt-6 font-sans text-lg font-semibold tracking-tight text-ink">
                  {t.processSteps[i]?.title ?? step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {t.processSteps[i]?.description ?? step.description}
                </p>
                <p className="mt-auto pt-4 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  {fmt(t.common.step, { n })}
                </p>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
