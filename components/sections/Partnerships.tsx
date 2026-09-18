"use client";

import { motion } from "framer-motion";
import { BandDecor } from "@/components/ui/BandDecor";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PARTNERSHIPS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

export function Partnerships() {
  const { t } = useLocale();

  return (
    <section
      id="recognition"
      className="band-canvas relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="Partnerships"
          title={t.partnerships.title}
          description={t.partnerships.description}
        />
        <Reveal
          stagger
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PARTNERSHIPS.map((item, index) => {
            return (
              <motion.div
                key={item.title}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-canvas fx-spot flex flex-col"
              >
                <span className="icon-chip">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-6 font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                  {t.partnerships.items[index]?.title ?? item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                  {t.partnerships.items[index]?.body ?? item.body}
                </p>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
