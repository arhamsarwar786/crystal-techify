"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/data";

export function Process({ detailHref }: { detailHref?: string }) {
  return (
    <section
      id="process"
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="Our process"
          description="Eight steps from discovery to a maintained product — transparent at every milestone."
          detailHref={detailHref}
        />

        <Reveal
          stagger
          className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PROCESS_STEPS.map((step) => (
            <motion.div
              key={step.index}
              variants={revealItem}
              className="card-on-muted flex h-full flex-col"
            >
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                Step {String(step.index).padStart(2, "0")}
              </span>
              <div className="mt-4 flex items-start gap-2.5">
                <step.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                <h3 className="font-sans text-base font-semibold text-ink">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {step.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
