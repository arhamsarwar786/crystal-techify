"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { SERVICES } from "@/lib/data";

export function Services() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="Core Services"
          title={
            <>
              Build the whole thing, or slot into the{" "}
              <span className="gradient-text">part you need</span>
            </>
          }
          description="First prototype to production AI — we cover every layer of the stack, and we're comfortable owning as much or as little of it as makes sense."
        />

        <Reveal
          stagger
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              variants={revealItem}
              className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <a
                href="#contact"
                aria-label={`Talk to us about ${service.title}`}
                className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
              >
              <TiltCard className="glass gradient-border h-full p-5 sm:p-6">
                <div className="flex h-full flex-col">
                  <div
                    className={`inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${service.accent} shadow-glow-sm sm:h-12 sm:w-12`}
                  >
                    <service.icon className="h-5 w-5 text-obsidian sm:h-6 sm:w-6" />
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug text-ink sm:mt-5 sm:text-lg">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/55 sm:mt-2.5 sm:text-sm">
                    {service.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="rounded-full border border-ink/10 bg-ink/5 px-2.5 py-1 text-xs text-ink/60"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-orange transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                    Talk to us about this
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </TiltCard>
              </a>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
