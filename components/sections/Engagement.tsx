"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { openCalendly } from "@/lib/calendly";
import { fmt, useLocale } from "@/lib/i18n";
import { locEngagement } from "@/lib/i18n/localize";
import { setSpot } from "@/lib/spot";
import { BandDecor } from "@/components/ui/BandDecor";

function ModelQualifier({
  slug,
  label,
  options,
  cta,
}: {
  slug: string;
  label: string;
  options: string[];
  cta: string;
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
                : "border border-ink/10 bg-transparent text-ink/70 hover:border-ink/30 hover:text-ink dark:border-white/10"
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
        {cta}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function Engagement({
  detailHref,
  home = false,
  pageStart = false,
}: {
  detailHref?: string;
  home?: boolean;
  pageStart?: boolean;
}) {
  const { t } = useLocale();
  const models = locEngagement(t).filter((m) =>
    home ? m.qualifierOptions?.length : true,
  );

  return (
    <section
      id="solutions"
      className={`band-muted relative scroll-mt-24 overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${
        pageStart ? "pt-28 sm:pt-36" : "pt-10 sm:pt-12 lg:pt-14"
      }`}
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="Engagement"
          title={t.engagement.title}
          description={t.engagement.description}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />

        <div className="relative mt-10">
          <div
            aria-hidden
            className="absolute left-[8%] right-[8%] top-8 hidden h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent lg:block"
          />
          <Reveal
            stagger
            className={`grid gap-4 ${
              home ? "lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {models.map((model) => {
              return (
                <motion.div key={model.title} variants={revealItem}>
                  <div
                    onMouseMove={setSpot}
                    className="card-on-canvas fx-spot flex h-full flex-col"
                  >
                    <span className="icon-chip">
                      <model.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                      {model.title}
                    </h3>
                    {model.points?.length ? (
                      <ul className="mt-3 grid gap-1.5 text-[14px] text-ink/55">
                        {model.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-orange" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink/55">
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
                        cta={t.common.getInTouch}
                      />
                    ) : (
                      <p className="mt-4 pt-3 text-xs uppercase tracking-wider text-brand-orange">
                        {fmt(t.common.bestFor, { value: model.bestFor })}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </Reveal>
        </div>

        {!home && (
          <div className="card-on-canvas relative mt-12 scroll-mt-28 sm:mt-16">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-orange">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {t.engagement.auditKicker}
            </span>
            <h3 className="mt-4 font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink sm:text-2xl">
              {t.engagement.auditTitle}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/70">
              {t.engagement.auditBody}
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                  {t.common.forExecutives}
                </p>
                <ul className="mt-2.5 grid gap-2">
                  {t.auditExec.map((label) => (
                    <li
                      key={label}
                      className="flex items-center gap-2.5 text-sm text-ink/70"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-orange" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-orange">
                  {t.common.forTechnical}
                </p>
                <ul className="mt-2.5 grid gap-2">
                  {t.auditTech.map((label) => (
                    <li
                      key={label}
                      className="flex items-center gap-2.5 text-sm text-ink/70"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-orange" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <CTAButton onClick={openCalendly} className="w-full sm:w-auto">
                {t.bookDemo}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </CTAButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
