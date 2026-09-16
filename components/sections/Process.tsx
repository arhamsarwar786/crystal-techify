"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/data";
import { fmt, useLocale } from "@/lib/i18n";

export function Process({ detailHref }: { detailHref?: string }) {
  const { t } = useLocale();
  return (
    <section
      id="process"
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
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
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.index}
              variants={revealItem}
              className="card-on-muted flex h-full flex-col"
            >
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                {fmt(t.common.step, {
                  n: String(step.index).padStart(2, "0"),
                })}
              </span>
              <div className="mt-4 flex items-start gap-2.5">
                <step.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                <h3 className="font-sans text-base font-semibold text-ink">
                  {t.processSteps[i]?.title ?? step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {t.processSteps[i]?.description ?? step.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
