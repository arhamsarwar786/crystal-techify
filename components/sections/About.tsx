"use client";

import { motion } from "framer-motion";
import { BrandBackdrop } from "@/components/ui/BrandBackdrop";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPANY, MISSION_POINTS } from "@/lib/data";

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <BrandBackdrop className="opacity-80" />
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="About Us"
          align="left"
          title={
            <>
              AI and advanced software,{" "}
              <span className="gradient-text">built in Dublin, Ohio</span>
            </>
          }
          description={COMPANY.about}
        />

        <p className="relative mt-6 max-w-3xl text-sm leading-relaxed text-ink/60 sm:text-base">
          Our core expertise includes AI-driven software development, Machine
          Learning, Natural Language Processing, and Automation, along with
          SaaS, Mobile and Web Development, UI/UX design, Web3, E-commerce, and
          Digital Marketing. To support growing demand, we also offer staff
          augmentation — experienced AI engineers, developers, and digital
          professionals so you can scale with agility.
        </p>

        <Reveal
          stagger
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5"
        >
          {MISSION_POINTS.map((point) => (
            <motion.div
              key={point.index}
              variants={revealItem}
              className="glass gradient-border relative overflow-hidden rounded-2xl p-5 sm:p-6"
            >
              <span className="font-display text-3xl text-ink/15 sm:text-4xl">
                {point.index}
              </span>
              <h3 className="mt-3 text-base font-semibold text-ink sm:text-lg">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/60">
                {point.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
