"use client";

import { Contact } from "@/components/sections/Contact";
import { IndustryDirectoryList } from "@/components/sections/Industries";
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
  const extras = Boolean(page);
  const otherBand = extras ? "canvas" : "muted";
  const contactBand = extras ? "muted" : "canvas";

  return (
    <>
      <section className="relative isolate min-h-[70svh] overflow-hidden bg-black pb-16 pt-28 sm:pb-20 sm:pt-36">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={industry.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span
          aria-hidden
          className="industry-scan absolute inset-0 opacity-40 mix-blend-overlay"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25"
        />
        <div className="section-shell relative max-w-3xl">
          <p className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
            <span aria-hidden className="h-px w-6 bg-brand-orange" />
            {t.common.industry}
          </p>
          <h1 className="mt-3 font-sans text-[1.85rem] font-semibold leading-[1.2] tracking-[-0.03em] text-white sm:text-[2.5rem]">
            {industry.name}
          </h1>
          <p className="mt-5 text-[15px] leading-[1.75] text-white/70 sm:text-base">
            {overview}
          </p>
          <div className="mt-8">
            <CalendlyCTAButton>{t.bookDemo}</CalendlyCTAButton>
          </div>
        </div>
      </section>

      {page ? (
        <>
          <section className="band-muted relative overflow-hidden py-16 sm:py-20">
            <BandDecor />
            <div className="section-shell relative">
              <SectionHeading
                title={t.common.problemsWeSee}
                description={fmt(t.common.problemsWeSeeBody, {
                  name: industry.name,
                })}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
                {(challenges ?? []).map((item) => (
                  <div
                    key={item.title}
                    onMouseMove={setSpot}
                    className="card-on-muted fx-spot"
                  >
                    <h3 className="font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                      {item.body}
                    </p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="band-canvas relative overflow-hidden py-16 sm:py-20">
            <BandDecor />
            <div className="section-shell relative">
              <SectionHeading
                title={t.common.howWeWork}
                description={t.common.howWeWorkIndustry}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
                {(approach ?? []).map((item) => {
                  return (
                    <div
                      key={item.title}
                      onMouseMove={setSpot}
                      className="card-on-canvas fx-spot"
                    >
                      <h3 className="font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </Reveal>
            </div>
          </section>

          <section className="band-muted relative overflow-hidden py-16 sm:py-20">
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

      <section
        className={`${otherBand === "muted" ? "band-muted" : "band-canvas"} relative overflow-hidden py-16 sm:py-20`}
      >
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading kicker="Industries" title={t.common.otherIndustries} />
          <div className="mt-8">
            <IndustryDirectoryList items={others} />
          </div>
        </div>
      </section>

      <Contact band={contactBand} />
    </>
  );
}
