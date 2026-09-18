"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Contact } from "@/components/sections/Contact";
import { CaseCard } from "@/components/sections/CaseCard";
import { BandDecor } from "@/components/ui/BandDecor";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { CASE_PAGES } from "@/lib/case-pages";
import { useLocale } from "@/lib/i18n";
import { locCase } from "@/lib/i18n/localize";
import { setSpot } from "@/lib/spot";

export function CaseDetail({ slug }: { slug: string }) {
  const { t } = useLocale();
  const raw = PORTFOLIO_ITEMS.find((item) => item.slug === slug);
  if (!raw) return null;

  const project = locCase(t, raw);
  const copy = t.caseItems[slug];
  const page = CASE_PAGES[slug];
  const brief = copy?.brief ?? page?.brief;
  const context = copy?.context ?? page?.context;
  const challenges = copy?.challenges ?? page?.challenges;
  const approach = copy?.approach ?? page?.approach;
  const shipped = copy?.shipped ?? page?.shipped;
  const stack = copy?.stack ?? page?.stack;
  const others = PORTFOLIO_ITEMS.filter((item) => item.slug !== slug)
    .map((item) => locCase(t, item))
    .slice(0, 3);

  const facts = [
    { label: t.common.client, value: project.client },
    { label: t.common.engagement, value: project.timeline },
    { label: t.common.team, value: project.teamSize },
  ];

  return (
    <>
      <section className="relative isolate min-h-[22rem] overflow-hidden bg-black sm:min-h-[28rem]">
        {project.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
          </>
        ) : (
          <BandDecor tone="dark" />
        )}
        <div className="section-shell relative flex min-h-[22rem] flex-col justify-end pb-12 pt-28 sm:min-h-[28rem] sm:pb-16 sm:pt-36">
          <p className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
            <span aria-hidden className="h-px w-6 bg-brand-orange" />
            {t.common.caseStudy} · {project.category}
          </p>
          <h1 className="mt-3 max-w-3xl font-sans text-[1.85rem] font-semibold leading-[1.2] tracking-[-0.03em] text-white sm:text-[2.5rem]">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-white/75 sm:text-base">
            {project.summary}
          </p>
          <div className="mt-8">
            <CalendlyCTAButton>
              {t.bookDemo}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CalendlyCTAButton>
          </div>
        </div>
      </section>

      <section className="band-canvas relative overflow-hidden py-16 sm:py-20">
        <BandDecor />
        <div className="section-shell relative">
          <Reveal stagger className="grid gap-4 sm:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact.label}
                onMouseMove={setSpot}
                className="card-on-canvas fx-spot"
              >
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  {fact.label}
                </p>
                <p className="mt-3 font-sans text-lg font-semibold tracking-tight text-ink">
                  {fact.value}
                </p>
              </div>
            ))}
          </Reveal>
          {brief || context ? (
            <div className="mt-10 max-w-3xl">
              {brief ? (
                <p className="text-[15px] leading-[1.8] text-ink/70 sm:text-base">
                  {brief}
                </p>
              ) : null}
              {context ? (
                <p className="mt-5 text-[15px] leading-[1.8] text-ink/65 sm:text-base">
                  {context}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {page ? (
        <>
          <section className="band-muted relative overflow-hidden py-16 sm:py-20">
            <BandDecor />
            <div className="section-shell relative">
              <SectionHeading
                title={t.common.theBrief}
                description={t.common.theBriefBody}
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
                title={t.common.howWeDelivered}
                description={t.common.howWeDeliveredBody}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
                {(approach ?? []).map((item) => (
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
                ))}
              </Reveal>
            </div>
          </section>

          <section className="band-muted relative overflow-hidden py-16 sm:py-20">
            <BandDecor />
            <div className="section-shell relative">
              <SectionHeading title={t.common.whatShipped} />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
                {(shipped ?? []).map((item) => (
                  <div
                    key={item}
                    onMouseMove={setSpot}
                    className="card-on-muted fx-spot flex items-start gap-3"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <p className="text-sm leading-relaxed text-ink/70">{item}</p>
                  </div>
                ))}
              </Reveal>

              <div
                onMouseMove={setSpot}
                className="card-on-muted fx-spot mt-4"
              >
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                  {t.common.outcome}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
                  {project.outcome}
                </p>
              </div>

              {project.tags.length ? (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-white px-3.5 py-1.5 text-xs text-ink/65 dark:bg-white/[0.06]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              {stack?.length ? (
                <div className="mt-10">
                  <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                    {t.common.theStack}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-ink/10 px-3.5 py-1.5 text-xs text-ink/70 dark:border-white/10"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        </>
      ) : null}

      {others.length ? (
        <section className="band-canvas relative overflow-hidden py-16 sm:py-20">
          <BandDecor />
          <div className="section-shell relative">
            <SectionHeading title={t.common.otherCases} />
            <Reveal
              stagger
              className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 lg:grid-cols-3"
            >
              {others.map((item) => (
                <CaseCard key={item.slug} {...item} />
              ))}
            </Reveal>
            <Link
              href="/case-studies"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-orange px-4 py-2.5 text-sm font-medium text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
            >
              {t.common.exploreMore}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : null}

      <Contact band="muted" />
    </>
  );
}
