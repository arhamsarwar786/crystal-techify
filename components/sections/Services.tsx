"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { SERVICES } from "@/lib/data";

export function Services({ detailHref }: { detailHref?: string }) {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Services we offer"
          detailHref={detailHref}
          title={
            <>
              From AI to staff augmentation —{" "}
              <span className="gradient-text">the full stack</span>
            </>
          }
          description="Artificial Intelligence, SaaS, Mobile, Design, E-commerce, Web3, CMS, Digital Marketing, and Staff Augmentation."
        />

        <Reveal
          stagger
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={revealItem}>
              <Link
                href={`/services/${service.slug}`}
                aria-label={`View details: ${service.title}`}
                className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
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
                        className="rounded-full border border-ink/10 bg-ink/5 px-2.5 py-1 text-xs text-ink/60 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-brand-orange/40 hover:text-ink hover:shadow-glow-sm"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-brand-orange">
                    View details
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </TiltCard>
              </Link>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
