"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/data";

const stepVariant: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 65%", "end 55%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-red/10 blur-[120px] sm:h-96 sm:w-96 sm:blur-[140px]"
      />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="How We Deliver"
          title={
            <>
              Our 8-step software{" "}
              <span className="gradient-text">engineering process</span>
            </>
          }
          description="A disciplined path from ambiguity to a maintained product — transparent at every milestone."
        />

        <div
          ref={railRef}
          className="relative mx-auto mt-12 max-w-3xl sm:mt-16"
        >
          {/* rail — through the icon centres when stacked, down the middle on lg+ */}
          <div className="absolute left-5 top-0 h-full w-px bg-ink/10 sm:left-7 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-brand-gradient sm:left-7 lg:left-1/2 lg:-translate-x-1/2"
          />

          <Reveal stagger>
            <ol className="space-y-6 sm:space-y-8">
              {PROCESS_STEPS.map((step, i) => (
                <motion.li
                  key={step.index}
                  variants={stepVariant}
                  className={`relative flex items-start gap-4 sm:gap-5 lg:w-1/2 ${
                    i % 2 === 1
                      ? "lg:ml-auto lg:flex-row lg:pl-10"
                      : "lg:flex-row-reverse lg:pr-10 lg:text-right"
                  }`}
                >
                  <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ink/10 bg-bg shadow-glow-sm sm:h-14 sm:w-14 sm:rounded-2xl">
                    <step.icon className="h-5 w-5 text-brand-orange sm:h-6 sm:w-6" />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-brand-gradient text-[10px] font-bold text-obsidian sm:h-6 sm:w-6 sm:text-[11px]">
                      {step.index}
                    </span>
                  </div>
                  <div className="glass gradient-border min-w-0 flex-1 rounded-xl p-4 sm:rounded-2xl sm:p-5">
                    <h3 className="text-[15px] font-semibold text-ink sm:text-base">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55 sm:text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
