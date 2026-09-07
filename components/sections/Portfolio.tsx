"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { BrandBackdrop } from "@/components/ui/BrandBackdrop";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { PORTFOLIO_CATEGORIES, PORTFOLIO_ITEMS } from "@/lib/data";

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
      id="portfolio"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <BrandBackdrop className="opacity-60" />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Our Work"
          title={
            <>
              Our <span className="gradient-text">portfolio</span>
            </>
          }
          description="Case studies from mobility, legal tech, real estate, transit analytics, and architecture — shipped with small specialist teams."
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:mt-10">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`relative rounded-full border border-ink/10 px-3.5 py-2 text-[13px] font-medium transition-colors sm:border-transparent sm:px-4 sm:text-sm ${
                active === cat
                  ? "text-obsidian"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="portfolio-pill"
                  className="absolute inset-0 rounded-full bg-brand-gradient"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <a
                  href={`mailto:info@crystaltechify.com?subject=${encodeURIComponent(
                    `Project like "${project.name}"`,
                  )}`}
                  aria-label={`Start a project like ${project.name}`}
                  className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
                >
                <TiltCard
                  intensity={5}
                  className="glass gradient-border h-full p-5 sm:p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-ink/10 bg-ink/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-ink/55 sm:text-[11px]">
                      {project.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/40 transition-colors group-hover:text-brand-orange" />
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-ink sm:text-xl">
                    {project.name}
                  </h3>
                  <p className="text-xs font-medium uppercase tracking-wider text-brand-orange">
                    {project.client}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    <span className="font-medium text-ink/80">Solution: </span>
                    {project.summary}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-xl border border-ink/10 bg-ink/[0.03] p-3">
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink/40">
                        <Clock className="h-3 w-3 text-brand-orange" />
                        Timeline
                      </p>
                      <p className="mt-1 text-sm text-ink/75">{project.timeline}</p>
                    </div>
                    <div className="rounded-xl border border-ink/10 bg-ink/[0.03] p-3">
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink/40">
                        <Users className="h-3 w-3 text-brand-orange" />
                        Team Size
                      </p>
                      <p className="mt-1 text-sm text-ink/75">{project.teamSize}</p>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-ink/5 px-2.5 py-1 text-xs text-ink/55 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:bg-ink/10 hover:text-ink hover:shadow-glow-sm"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
