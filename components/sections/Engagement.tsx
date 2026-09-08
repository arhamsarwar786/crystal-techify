"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { openCalendly } from "@/lib/calendly";
import { AUDIT_DELIVERABLES, ENGAGEMENT_MODELS, TECHNICAL_AUDIT } from "@/lib/data";

export function Engagement({ detailHref }: { detailHref?: string }) {
  return (
    <section
      id="solutions"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="Engagement Models"
          detailHref={detailHref}
          title={
            <>
              Work with us the way that{" "}
              <span className="gradient-text">fits your roadmap</span>
            </>
          }
          description="Dedicated development team, product development, staff augmentation, or consultant — pick the shape that fits your roadmap."
        />

        <Reveal
          stagger
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
        >
          {ENGAGEMENT_MODELS.map((model) => (
            <motion.div key={model.title} variants={revealItem}>
              <a
                href="/contact"
                aria-label={`Ask about the ${model.title} model`}
                className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
              >
                <TiltCard className="glass gradient-border h-full p-5">
                  <div className="flex h-full flex-col">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-red to-brand-orange text-obsidian shadow-glow-sm">
                      <model.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ink">
                      {model.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">
                      {model.description}
                    </p>
                    <p className="mt-4 border-t border-ink/10 pt-3 text-xs uppercase tracking-wider text-brand-orange">
                      Best for: {model.bestFor}
                    </p>
                  </div>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </Reveal>

        {/* Free audit banner */}
        <Reveal
          id="consultation"
          className="glass-strong gradient-border relative mt-12 scroll-mt-28 overflow-hidden rounded-2xl p-6 sm:mt-16 sm:rounded-3xl sm:p-12"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-orange/25 blur-[90px] sm:-right-20 sm:-top-20 sm:h-64 sm:w-64 sm:blur-[110px]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-10">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/65 sm:text-xs sm:tracking-[0.2em]">
                <Clock className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                Free · 90 Minutes
              </span>
              <h3 className="mt-4 text-xl font-semibold leading-tight text-ink sm:mt-5 sm:text-3xl">
                Strategic Consultation Offer
              </h3>
              <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-ink/60 sm:text-sm">
                Free 90-minute session for executives and technical teams. A
                no-obligation working session — walk away with a clear view of
                where your platform stands and what to do next.
              </p>

              <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                    For Executives
                  </p>
                  <ul className="mt-2.5 grid gap-2">
                    {AUDIT_DELIVERABLES.map((d) => (
                      <li
                        key={d.label}
                        className="flex items-center gap-2.5 text-sm text-ink/70"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-orange" />
                        {d.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                    For Technical Teams
                  </p>
                  <ul className="mt-2.5 grid gap-2">
                    {TECHNICAL_AUDIT.map((d) => (
                      <li
                        key={d.label}
                        className="flex items-center gap-2.5 text-sm text-ink/70"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-orange" />
                        {d.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-7 sm:mt-8">
                <CTAButton onClick={openCalendly} className="w-full sm:w-auto">
                  Book a Consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </CTAButton>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="glass rounded-2xl p-6">
                <p className="text-xs uppercase tracking-wider text-ink/40">
                  Typical output
                </p>
                <div className="mt-4 space-y-3">
                  {[
                    "Digital transformation audit",
                    "Market gap & tech-stack evaluation",
                    "Architecture & code-quality findings",
                    "ROI projections and 90-day plan",
                  ].map((line) => (
                    <div
                      key={line}
                      className="flex items-center gap-3 rounded-lg border border-ink/10 bg-ink/[0.03] px-3 py-2.5 text-sm text-ink/70"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-gradient" />
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
