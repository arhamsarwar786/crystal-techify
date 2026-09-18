"use client";

import { motion } from "framer-motion";
import { BandDecor } from "@/components/ui/BandDecor";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MISSION_POINTS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

export function About({
  detailHref,
  pageStart = false,
}: {
  detailHref?: string;
  pageStart?: boolean;
}) {
  const { t } = useLocale();
  return (
    <section
      id="about"
      className={`band-canvas relative scroll-mt-24 overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${
        pageStart ? "pt-28 sm:pt-36" : "pt-16 sm:pt-20 lg:pt-24"
      }`}
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="About us"
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
              onMouseMove={setSpot}
              className="card-on-canvas fx-spot"
            >
              <h3 className="font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                {t.mission[i]?.title ?? point.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                {t.mission[i]?.description ?? point.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
