"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { locIndustry } from "@/lib/i18n/localize";
import { setSpot } from "@/lib/spot";

export function Industries({ detailHref }: { detailHref?: string }) {
  const { t } = useLocale();
  const items = INDUSTRIES.map((i) => locIndustry(t, i));
  const indexed = detailHref ? "05" : undefined;

  return (
    <section
      id="industries"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          index={indexed}
          title={t.industries.title}
          description={t.industries.description}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />

        <Reveal
          stagger
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((industry, index) => {
            const n = String(index + 1).padStart(2, "0");
            return (
              <motion.div key={industry.slug} variants={revealItem}>
                <Link
                  href={`/industries/${industry.slug}`}
                  onMouseMove={setSpot}
                  aria-label={`${t.common.viewDetails}: ${industry.name}`}
                  className="card-on-canvas fx-spot group flex h-full flex-col"
                >
                  <span aria-hidden className="index-ghost">
                    {n}
                  </span>
                  <div className="flex items-start justify-between gap-3">
                    <span className="icon-chip">
                      <industry.icon className="h-5 w-5" />
                    </span>
                    <span className="font-sans text-[11px] font-semibold tracking-[0.18em] text-ink/30">
                      {n}
                    </span>
                  </div>
                  <h3 className="mt-6 font-sans text-lg font-semibold tracking-tight text-ink">
                    {industry.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {industry.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-orange">
                    {t.common.viewDetails}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
