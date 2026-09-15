"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ADVANTAGES } from "@/lib/data";

export function Advantages({ detailHref }: { detailHref?: string }) {
  return (
    <section
      id="advantages"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="Why Crystal Techify"
          description="Advantages of a single US engineering base — from delivery pace to the people who ship."
          detailHref={detailHref}
        />

        <Reveal
          stagger
          className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ADVANTAGES.map((item) => (
            <motion.div
              key={item.index}
              variants={revealItem}
              className="card-on-canvas"
            >
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                {String(item.index).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
