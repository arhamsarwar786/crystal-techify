"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/data";

export function Industries() {
  return (
    <section
      id="industries"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="Industries"
          title={
            <>
              Domain fluency across{" "}
              <span className="gradient-text">regulated and complex</span>{" "}
              sectors
            </>
          }
        />

        <Reveal
          stagger
          className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-12 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4"
        >
          {INDUSTRIES.map((industry) => (
            <motion.div
              key={industry.name}
              variants={revealItem}
              className="glass gradient-border group flex items-center gap-2.5 rounded-xl p-3 transition-colors hover:bg-ink/[0.08] sm:gap-3 sm:p-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink/5 text-brand-orange transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10">
                <industry.icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <span className="min-w-0 text-[13px] font-medium leading-tight text-ink/75 sm:text-sm">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
