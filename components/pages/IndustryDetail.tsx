"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Contact } from "@/components/sections/Contact";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/data";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { fmt, useLocale } from "@/lib/i18n";
import { locIndustry } from "@/lib/i18n/localize";

export function IndustryDetail({ slug }: { slug: string }) {
  const { t } = useLocale();
  const raw = INDUSTRIES.find((i) => i.slug === slug);
  if (!raw) return null;
  const industry = locIndustry(t, raw);
  const copy = t.industryItems[slug];
  const page = INDUSTRY_PAGES[slug];
  const overview = copy?.overview ?? page?.overview ?? industry.description;
  const challenges = copy?.challenges ?? page?.challenges;
  const approach = copy?.approach ?? page?.approach;
  const outcomes = copy?.outcomes ?? page?.outcomes;
  const others = INDUSTRIES.filter((i) => i.slug !== slug).map((i) =>
    locIndustry(t, i),
  );

  return (
    <>
      <section className="band-canvas relative scroll-mt-24 overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div className="section-shell relative max-w-3xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
            {t.common.industry}
          </p>
          <h1 className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.5rem]">
            {industry.name}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-ink/70 sm:text-base">
            {overview}
          </p>
          <div className="mt-8">
            <CalendlyCTAButton>{t.bookDemo}</CalendlyCTAButton>
          </div>
        </div>
      </section>

      {page ? (
        <>
          <section className="band-muted relative py-16 sm:py-20">
            <div className="section-shell">
              <SectionHeading
                title={t.common.problemsWeSee}
                description={fmt(t.common.problemsWeSeeBody, {
                  name: industry.name,
                })}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
                {(challenges ?? []).map((item) => (
                  <div key={item.title} className="card-on-muted">
                    <h3 className="font-sans text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {item.body}
                    </p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="band-canvas relative py-16 sm:py-20">
            <div className="section-shell">
              <SectionHeading
                title={t.common.howWeWork}
                description={t.common.howWeWorkIndustry}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
                {(approach ?? []).map((item, i) => (
                  <div key={item.title} className="card-on-canvas">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-sans text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/70">
                      {item.body}
                    </p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="band-muted relative py-16 sm:py-20">
            <div className="section-shell">
              <SectionHeading title={t.common.outcomesAim} />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {(outcomes ?? []).map((item) => (
                  <li key={item} className="card-on-muted text-sm text-ink/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : null}

      <section className="band-muted relative py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading title={t.common.otherIndustries} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/industries/${item.slug}`}
                  className="card-on-muted group flex items-center justify-between gap-3"
                >
                  <span className="font-sans text-sm font-semibold text-ink">
                    {item.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/30 transition-colors group-hover:text-brand-orange" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </>
  );
}
