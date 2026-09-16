"use client";

import { motion } from "framer-motion";
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
      className="band-canvas relative py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          index="08"
          title={t.partnerships.title}
          description={t.partnerships.description}
        />
        <Reveal
          stagger
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PARTNERSHIPS.map((item, index) => {
            const n = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={item.title}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-canvas fx-spot flex flex-col"
              >
                <span aria-hidden className="index-ghost">
                  {n}
                </span>
                <div className="flex items-start justify-between gap-3">
                  <span className="icon-chip">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <span className="font-sans text-[11px] font-semibold tracking-[0.18em] text-ink/30">
                    {n}
                  </span>
                </div>
                <h3 className="mt-6 font-sans text-lg font-semibold tracking-tight text-ink">
                  {t.partnerships.items[index]?.title ?? item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
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
