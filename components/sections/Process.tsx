"use client";

import { motion } from "framer-motion";
import { BandDecor } from "@/components/ui/BandDecor";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
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
      className={`band-canvas relative scroll-mt-24 overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${
        pageStart ? "pt-28 sm:pt-36" : "pt-16 sm:pt-20 lg:pt-24"
      }`}
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="How we work"
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
            return (
              <motion.div
                key={step.index}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-muted fx-spot flex h-full flex-col"
              >
                <span className="icon-chip">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                  {t.processSteps[i]?.title ?? step.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                  {t.processSteps[i]?.description ?? step.description}
                </p>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
