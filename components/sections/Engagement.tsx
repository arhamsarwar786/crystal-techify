"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { openCalendly } from "@/lib/calendly";
import { AUDIT_DELIVERABLES, ENGAGEMENT_MODELS, TECHNICAL_AUDIT } from "@/lib/data";

function ModelQualifier({
  slug,
  label,
  options,
}: {
  slug: string;
  label: string;
  options: string[];
}) {
  const [choice, setChoice] = useState(options[0] ?? "");
  const href = `/contact?model=${encodeURIComponent(slug)}&need=${encodeURIComponent(choice)}`;

  return (
    <div className="mt-5 border-t border-ink/10 pt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setChoice(option)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              choice === option
                ? "bg-brand-orange text-white"
                : "bg-white text-ink/70 hover:text-ink dark:bg-white/[0.08]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange hover:text-ink dark:hover:text-white"
      >
        Get in touch
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function Engagement({
  detailHref,
  home = false,
}: {
  detailHref?: string;
  home?: boolean;
}) {
  const models = home
    ? ENGAGEMENT_MODELS.filter((m) => m.qualifierOptions?.length)
    : ENGAGEMENT_MODELS;

  return (
    <section
      id="solutions"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          title="Work with us"
          description="Flexible engagement designed to match team size, duration, and how much of the product you want us to own."
          detailHref={detailHref}
        />

        <Reveal
          stagger
          className={`mt-8 grid gap-4 sm:mt-10 ${
            home ? "lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {models.map((model) => (
            <motion.div key={model.title} variants={revealItem}>
              <div className="card-on-canvas flex h-full flex-col">
                <span className="grid h-10 w-10 place-items-center text-brand-orange">
                  <model.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                  {model.title}
                </h3>
                {model.points?.length ? (
                  <ul className="mt-3 grid gap-1.5 text-sm text-ink/70">
                    {model.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-orange" />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70">
                    {model.description}
                  </p>
                )}
                {home &&
                model.slug &&
                model.qualifierLabel &&
                model.qualifierOptions ? (
                  <ModelQualifier
                    slug={model.slug}
                    label={model.qualifierLabel}
                    options={model.qualifierOptions}
                  />
                ) : (
                  <p className="mt-4 pt-3 text-xs uppercase tracking-wider text-brand-orange">
                    Best for: {model.bestFor}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </Reveal>

        {!home && (
          <div className="card-on-canvas relative mt-12 scroll-mt-28 sm:mt-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-orange">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              Free · 90 Minutes
            </span>
            <h3 className="mt-4 font-sans text-xl font-semibold text-ink sm:text-2xl">
              Strategic Consultation Offer
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/70">
              Free 90-minute session for executives and technical teams. A
              no-obligation working session — walk away with a clear view of
              where your platform stands and what to do next.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
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

            <div className="mt-8">
              <CTAButton onClick={openCalendly} className="w-full sm:w-auto">
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CTAButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
