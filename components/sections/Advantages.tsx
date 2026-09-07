"use client";

import { motion } from "framer-motion";
import { BrandBackdrop } from "@/components/ui/BrandBackdrop";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADVANTAGES } from "@/lib/data";

export function Advantages() {
  return (
    <section
      id="advantages"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <BrandBackdrop className="opacity-70" />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Why Crystal Techify"
          title={
            <>
              Advantages of choosing{" "}
              <span className="gradient-text">Crystal Techify</span>
            </>
          }
        />

        <Reveal
          stagger
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ADVANTAGES.map((item) => (
            <motion.div
              key={item.index}
              variants={revealItem}
              className="glass relative rounded-2xl p-5 pt-8 sm:p-6 sm:pt-10"
            >
              <span className="absolute left-1/2 top-0 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand-red text-xs font-bold text-white shadow-glow-sm">
                {item.index}
              </span>
              <h3 className="text-center text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-ink/60">
                {item.description}
              </p>
              <span className="mx-auto mt-5 block h-1 w-12 rounded-full bg-brand-red" />
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
