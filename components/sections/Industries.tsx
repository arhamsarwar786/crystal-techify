"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/data";

export function Industries({ detailHref }: { detailHref?: string }) {
  return (
    <section
      id="industries"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Industries we serve in"
          detailHref={detailHref}
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
            const featured = industry.slug === "on-demand-services";
            return (
              <motion.div key={industry.slug} variants={revealItem}>
                <Link
                  href={`/industries/${industry.slug}`}
                  aria-label={`View details: ${industry.name}`}
                  className={`group flex h-full flex-col gap-3 rounded-xl p-4 transition-colors sm:p-5 ${
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
                  <div className="flex flex-1 flex-col">
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
                    <span
                      className={`mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium ${
                        featured ? "text-white" : "text-brand-orange"
                      }`}
                    >
                      View details
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
