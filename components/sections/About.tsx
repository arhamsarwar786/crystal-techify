"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MISSION_POINTS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

export function About({ detailHref }: { detailHref?: string }) {
  const { t } = useLocale();
  return (
    <section
      id="about"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title={t.about.title}
          description={t.companyAbout}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />

        <p className="relative mt-6 max-w-3xl text-sm leading-relaxed text-ink/70 sm:text-base">
          {t.common.companyAboutExtra}
        </p>

        <Reveal
          stagger
          className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3"
        >
          {MISSION_POINTS.map((point, i) => (
            <motion.div
              key={point.index}
              variants={revealItem}
              className="card-on-canvas relative overflow-hidden"
            >
              <span className="font-display text-3xl text-ink/15 sm:text-4xl">
                {point.index}
              </span>
              <h3 className="mt-3 font-sans text-base font-semibold text-ink">
                {t.mission[i]?.title ?? point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {t.mission[i]?.description ?? point.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
