"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from "@/lib/data";
import { CaseCard } from "@/components/sections/CaseCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Portfolio() {
  const [active, setActive] = useState<(typeof PORTFOLIO_CATEGORIES)[number]>(
    "All",
  );

  const filtered = useMemo(
    () =>
      active === "All"
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((p) => p.category === active),
    [active],
  );

  return (
    <section
      id="case-studies"
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="Be the next success story"
          description="Case studies from mobility, legal, real estate, transit, and architecture — shipped with small specialist teams."
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
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <CaseCard {...project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
