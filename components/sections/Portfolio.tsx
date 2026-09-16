"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from "@/lib/data";
import { CaseCard } from "@/components/sections/CaseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n";
import { locCase } from "@/lib/i18n/localize";

export function Portfolio() {
  const { t } = useLocale();
  const [active, setActive] = useState<(typeof PORTFOLIO_CATEGORIES)[number]>(
    "All",
  );

  const filtered = useMemo(() => {
    const items = PORTFOLIO_ITEMS.map((p) => locCase(t, p));
    return active === "All"
      ? items
      : items.filter((p) => p.category === active);
  }, [active, t]);

  return (
    <section
      id="case-studies"
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title={t.cases.title}
          description={t.cases.description}
        />

        <div className="mt-8 flex flex-wrap gap-2 sm:mt-10">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`relative rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors sm:px-4 sm:text-sm ${
                active === cat
                  ? "text-white"
                  : "bg-white text-ink/60 hover:text-ink dark:bg-white/[0.06]"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="portfolio-pill"
                  className="absolute inset-0 rounded-full bg-brand-orange"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {t.categories[cat] ?? cat}
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2, margin: "0px 0px -8% 0px" }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.65, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <CaseCard {...project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
