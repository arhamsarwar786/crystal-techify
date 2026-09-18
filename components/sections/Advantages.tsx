"use client";

import { motion } from "framer-motion";
import { BandDecor } from "@/components/ui/BandDecor";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADVANTAGES } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

export function Advantages({ detailHref }: { detailHref?: string }) {
  const { t } = useLocale();
  return (
    <section
      id="advantages"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="Why us"
          title={t.advantages.title}
          description={t.advantages.description}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />

        <Reveal
          stagger
          className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ADVANTAGES.map((item, i) => {
            return (
              <motion.div
                key={item.index}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-canvas fx-spot"
              >
                <h3 className="font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                  {t.advantageItems[i]?.title ?? item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                  {t.advantageItems[i]?.description ?? item.description}
                </p>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
