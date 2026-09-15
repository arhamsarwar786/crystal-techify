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
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="Industries we serve"
          description="Domain fluency from retail and healthcare to logistics, fintech, and blockchain."
          detailHref={detailHref}
        />

        <Reveal
          stagger
          className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {INDUSTRIES.map((industry) => (
            <motion.div key={industry.slug} variants={revealItem}>
              <Link
                href={`/industries/${industry.slug}`}
                aria-label={`View details: ${industry.name}`}
                className="card-on-canvas group flex h-full flex-col"
              >
                <industry.icon className="h-5 w-5 text-brand-orange" />
                <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                  {industry.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                  {industry.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-brand-orange">
                  View details
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
