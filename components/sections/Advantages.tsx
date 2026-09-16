"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADVANTAGES } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

export function Advantages({ detailHref }: { detailHref?: string }) {
  const { t } = useLocale();
  return (
    <section
      id="advantages"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title={t.advantages.title}
          description={t.advantages.description}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />

        <Reveal
          stagger
          className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ADVANTAGES.map((item, i) => (
            <motion.div
              key={item.index}
              variants={revealItem}
              className="card-on-canvas"
            >
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                {String(item.index).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                {t.advantageItems[i]?.title ?? item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {t.advantageItems[i]?.description ?? item.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
