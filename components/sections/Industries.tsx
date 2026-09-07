"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandBackdrop } from "@/components/ui/BrandBackdrop";
import { INDUSTRIES } from "@/lib/data";

export function Industries() {
  return (
    <section
      id="industries"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <BrandBackdrop className="opacity-60" />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Industries we serve in"
          title={
            <>
              Domain fluency from retail to{" "}
              <span className="gradient-text">blockchain</span>
            </>
          }
        />

        <Reveal
          stagger
          className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {INDUSTRIES.map((industry) => {
            const featured = industry.name === "On Demand Services";
            return (
              <motion.div
                key={industry.name}
                variants={revealItem}
                className={`group flex flex-col gap-3 rounded-xl p-4 transition-colors sm:p-5 ${
                  featured
                    ? "bg-brand-red text-white shadow-glow-sm"
                    : "glass gradient-border hover:bg-ink/[0.08]"
                }`}
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                    featured
                      ? "bg-white/15 text-white"
                      : "bg-ink/5 text-brand-red"
                  }`}
                >
                  <industry.icon className="h-5 w-5" />
                </span>
                <div>
                  <span
                    className={`block text-sm font-semibold ${
                      featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {industry.name}
                  </span>
                  <p
                    className={`mt-1.5 text-[13px] leading-relaxed ${
                      featured ? "text-white/85" : "text-ink/60"
                    }`}
                  >
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
