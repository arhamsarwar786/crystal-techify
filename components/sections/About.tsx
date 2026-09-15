"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPANY, MISSION_POINTS } from "@/lib/data";

export function About({ detailHref }: { detailHref?: string }) {
  return (
    <section
      id="about"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="About us"
          description={COMPANY.about}
          detailHref={detailHref}
        />

        <p className="relative mt-6 max-w-3xl text-sm leading-relaxed text-ink/70 sm:text-base">
          Our core expertise includes AI-driven software development, Machine
          Learning, Natural Language Processing, and Automation, along with
          SaaS, Mobile and Web Development, UI/UX design, Web3, E-commerce, and
          Digital Marketing. To support growing demand, we also offer staff
          augmentation — experienced AI engineers, developers, and digital
          professionals so you can scale with agility.
        </p>

        <Reveal
          stagger
          className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3"
        >
          {MISSION_POINTS.map((point) => (
            <motion.div
              key={point.index}
              variants={revealItem}
              className="card-on-canvas relative overflow-hidden"
            >
              <span className="font-display text-3xl text-ink/15 sm:text-4xl">
                {point.index}
              </span>
              <h3 className="mt-3 font-sans text-base font-semibold text-ink">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {point.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
