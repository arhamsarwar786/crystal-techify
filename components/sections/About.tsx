"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { COMPANY, MISSION_POINTS } from "@/lib/data";

export function About({
  detailHref,
  accent = false,
}: {
  detailHref?: string;
  accent?: boolean;
}) {
  return (
    <section
      id="about"
      className={`relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24 ${
        accent ? "bg-[#FF5322]" : ""
      }`}
    >
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="About Us"
          align="left"
          detailHref={detailHref}
          tone={accent ? "brand" : "default"}
          title={
            accent ? (
              <>
                AI and advanced software,{" "}
                <span className="text-black">built in Dublin, Ohio</span>
              </>
            ) : (
              <>
                AI and advanced software,{" "}
                <span className="gradient-text">built in Dublin, Ohio</span>
              </>
            )
          }
          description={COMPANY.about}
        />

        <p
          className={`relative mt-6 max-w-3xl text-sm leading-relaxed sm:text-base ${
            accent ? "text-white" : "text-ink/60"
          }`}
        >
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
              className={
                accent
                  ? "relative overflow-hidden rounded-2xl bg-white p-5 text-black sm:p-6"
                  : "glass gradient-border relative overflow-hidden rounded-2xl p-5 sm:p-6"
              }
            >
              <span
                className={`font-display text-3xl sm:text-4xl ${
                  accent ? "text-black/20" : "text-ink/15"
                }`}
              >
                {point.index}
              </span>
              <h3
                className={`mt-3 text-base font-semibold sm:text-lg ${
                  accent ? "text-black" : "text-ink"
                }`}
              >
                {point.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  accent ? "text-black/70" : "text-ink/60"
                }`}
              >
                {point.description}
              </p>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
