"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { CaseCard } from "@/components/sections/CaseCard";

export function FeaturedCases({ detailHref }: { detailHref?: string }) {
  const featuredTop = PORTFOLIO_ITEMS.slice(0, 2);
  const featuredBottom = PORTFOLIO_ITEMS.slice(2);

  return (
    <section
      id="case-studies"
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="Be the next success story"
          description="Work shipped with small specialist teams — mobility, legal, real estate, transit, and architecture."
          detailHref={detailHref}
        />

        <div className="mt-8 grid gap-4 sm:mt-10">
          <Reveal stagger className="grid gap-4 lg:grid-cols-2">
            {featuredTop.map((project) => (
              <motion.div key={project.slug} variants={revealItem}>
                <CaseCard {...project} />
              </motion.div>
            ))}
          </Reveal>
          <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBottom.map((project) => (
              <motion.div key={project.slug} variants={revealItem}>
                <CaseCard {...project} />
              </motion.div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
