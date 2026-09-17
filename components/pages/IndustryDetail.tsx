"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Contact } from "@/components/sections/Contact";
import { BandDecor } from "@/components/ui/BandDecor";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/data";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { fmt, useLocale } from "@/lib/i18n";
import { locIndustry } from "@/lib/i18n/localize";
import { setSpot } from "@/lib/spot";

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
      <section className="band-canvas relative scroll-mt-24 overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-36">
        <BandDecor />
        <div className="section-shell relative max-w-3xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-orange">
            {t.common.industry}
          </p>
          <h1 className="mt-3 font-sans text-[1.85rem] font-semibold leading-[1.2] tracking-tight text-ink sm:text-[2.5rem]">
            {industry.name}
          </h1>
          <span
            aria-hidden
            className="mt-4 block h-px w-9 bg-brand-orange"
          />
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
          <section className="band-muted relative overflow-hidden py-20 sm:py-24">
            <BandDecor />
            <div className="section-shell relative">
              <SectionHeading
                title={t.common.problemsWeSee}
                description={fmt(t.common.problemsWeSeeBody, {
                  name: industry.name,
                })}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
                {(challenges ?? []).map((item, i) => (
                  <div
                    key={item.title}
                    onMouseMove={setSpot}
                    className="card-on-muted fx-spot"
                  >
                    <span aria-hidden className="index-ghost">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-sans text-lg font-semibold tracking-tight text-ink">
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

          <section className="band-canvas relative overflow-hidden py-20 sm:py-24">
            <BandDecor />
            <div className="section-shell relative">
              <SectionHeading
                title={t.common.howWeWork}
                description={t.common.howWeWorkIndustry}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
                {(approach ?? []).map((item, i) => {
                  const n = String(i + 1).padStart(2, "0");
                  return (
                    <div
                      key={item.title}
                      onMouseMove={setSpot}
                      className="card-on-canvas fx-spot"
                    >
                      <span aria-hidden className="index-ghost">
                        {n}
                      </span>
                      <span className="font-sans text-[11px] font-semibold tracking-[0.18em] text-ink/30">
                        {n}
                      </span>
                      <h3 className="mt-6 font-sans text-lg font-semibold tracking-tight text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/70">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </Reveal>
            </div>
          </section>

          <section className="band-muted relative overflow-hidden py-20 sm:py-24">
            <BandDecor />
            <div className="section-shell relative">
              <SectionHeading title={t.common.outcomesAim} />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {(outcomes ?? []).map((item) => (
                  <li
                    key={item}
                    onMouseMove={setSpot}
                    className="card-on-muted fx-spot text-sm text-ink/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : null}

      <section className="band-muted relative overflow-hidden py-20 sm:py-24">
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading title={t.common.otherIndustries} />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/industries/${item.slug}`}
                  onMouseMove={setSpot}
                  className="card-on-muted fx-spot group flex items-center justify-between gap-3"
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
