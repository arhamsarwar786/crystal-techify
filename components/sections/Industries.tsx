"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { INDUSTRIES } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { locIndustry } from "@/lib/i18n/localize";
import { BandDecor } from "@/components/ui/BandDecor";
import type { Industry } from "@/lib/types";

function pad(index: number) {
  return String(index).padStart(2, "0");
}

export function IndustryDirectoryList({ items }: { items: Industry[] }) {
  const { t } = useLocale();

  return (
    <div className="flex flex-col gap-3">
      {items.map((industry, index) => {
        const Icon = industry.icon;
        const flip = index % 2 === 1;

        return (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className={`group/row grid overflow-hidden rounded-[1.5rem] bg-[#111] text-white ring-1 ring-white/10 transition-[ring-color] duration-300 hover:ring-brand-orange sm:grid-cols-12 ${
              flip ? "sm:[&_.industry-row-copy]:order-first" : ""
            }`}
          >
            <div className="relative h-44 overflow-hidden sm:col-span-5 sm:h-auto sm:min-h-[13.5rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={industry.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover/row:scale-[1.05]"
              />
              <span
                aria-hidden
                className="industry-scan absolute inset-0 opacity-50 mix-blend-overlay"
              />
            </div>
            <div className="industry-row-copy flex flex-col justify-center px-5 py-5 sm:col-span-7 sm:px-8 sm:py-7">
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs font-semibold tabular-nums tracking-[0.18em] text-brand-orange">
                  {pad(index + 1)}
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/80">
                  <Icon className="h-3.5 w-3.5" />
                </span>
              </div>
              <h3 className="mt-3 font-sans text-[1.45rem] font-semibold leading-snug tracking-tight sm:text-[1.7rem]">
                {industry.name}
              </h3>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-white/65">
                {industry.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange">
                {t.common.viewDetails}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/row:translate-x-0.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function IndustryExplorer({ items }: { items: Industry[] }) {
  const { t } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = items[activeIndex] ?? items[0];
  const ActiveIcon = active?.icon;

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused || items.length < 2) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  if (!active) return null;

  return (
    <div
      className="mt-10 grid items-stretch gap-6 sm:mt-12 lg:grid-cols-12 lg:gap-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ol className="flex flex-col lg:col-span-5">
        {items.map((industry, index) => {
          const selected = index === activeIndex;
          return (
            <li key={industry.slug} className="border-b border-ink/10 dark:border-white/10">
              <Link
                href={`/industries/${industry.slug}`}
                aria-current={selected ? "true" : undefined}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => {
                  setActiveIndex(index);
                  setPaused(true);
                }}
                onBlur={() => setPaused(false)}
                className={`flex w-full items-center gap-4 py-3.5 text-left transition-colors sm:py-4 ${
                  selected ? "text-ink" : "text-ink/40 hover:text-ink/75"
                }`}
              >
                <span
                  className={`w-6 font-sans text-xs font-semibold tabular-nums tracking-[0.18em] ${
                    selected ? "text-brand-orange" : "text-ink/25"
                  }`}
                >
                  {pad(index + 1)}
                </span>
                <span className="flex-1 font-sans text-lg font-semibold tracking-tight sm:text-xl">
                  {industry.name}
                </span>
                <ArrowRight
                  className={`h-4 w-4 shrink-0 text-brand-orange transition-opacity duration-200 ${
                    selected ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] bg-black sm:min-h-[26rem] lg:col-span-7">
        {items.map((industry, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={industry.slug}
            src={industry.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <span
          aria-hidden
          className="industry-scan absolute inset-0 opacity-50 mix-blend-overlay"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10"
        />
        <div className="relative z-10 flex h-full min-h-[22rem] flex-col justify-end p-6 sm:min-h-[26rem] sm:p-8">
          {ActiveIcon ? (
            <span className="mb-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm">
              <ActiveIcon className="h-4 w-4" />
            </span>
          ) : null}
          <p className="font-sans text-2xl font-semibold tracking-tight text-white sm:text-[1.85rem]">
            {active.name}
          </p>
          <p className="mt-2 max-w-md text-[14px] leading-relaxed text-white/70">
            {active.description}
          </p>
          <Link
            href={`/industries/${active.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange"
          >
            {t.common.viewDetails}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span
            aria-hidden
            className="mt-6 block h-px overflow-hidden bg-white/20"
          >
            <span
              key={`${active.slug}-${paused ? "pause" : "run"}`}
              className={`industry-progress block h-full bg-brand-orange ${
                paused ? "is-paused" : ""
              }`}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Industries({
  detailHref,
  pageStart = false,
}: {
  detailHref?: string;
  pageStart?: boolean;
}) {
  const { t } = useLocale();
  const items = INDUSTRIES.map((i) => locIndustry(t, i));
  const featured = !pageStart;

  return (
    <section
      id="industries"
      className={`band-canvas relative scroll-mt-24 overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${
        pageStart ? "pt-28 sm:pt-36" : "pt-16 sm:pt-20 lg:pt-24"
      }`}
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="Industries"
          title={t.industries.title}
          description={t.industries.description}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />
        {featured ? (
          <IndustryExplorer items={items} />
        ) : (
          <Reveal className="mt-10 sm:mt-12">
            <IndustryDirectoryList items={items} />
          </Reveal>
        )}
      </div>
    </section>
  );
}
