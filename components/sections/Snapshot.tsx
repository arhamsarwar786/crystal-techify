"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BandDecor } from "@/components/ui/BandDecor";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/lib/i18n";

function splitTitle(title: string): [string, string] | [string] {
  const at = title.toLowerCase().lastIndexOf(" to ");
  if (at < 0) return [title];
  return [title.slice(0, at), title.slice(at + 1)];
}

export function Snapshot() {
  const { t } = useLocale();
  const statsRef = useRef<HTMLDivElement>(null);
  const shown = useInView(statsRef, { once: true, margin: "-80px", amount: 0.35 });
  const titleParts = splitTitle(t.snapshot.title);

  return (
    <section
      id="snapshot"
      aria-labelledby="snapshot-heading"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <BandDecor />

      <div className="section-shell relative">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-8">
            <h2
              id="snapshot-heading"
              className="font-sans text-[1.9rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2.75rem] sm:leading-[1.08]"
            >
              {titleParts.length === 2 ? (
                <>
                  <span className="block">{titleParts[0]}</span>
                  <span className="mt-1 block text-brand-orange">
                    {titleParts[1]}
                  </span>
                </>
              ) : (
                titleParts[0]
              )}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-4">
            <p className="text-[15px] leading-[1.75] text-ink/60">
              {t.snapshot.description}
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-brand-orange px-4 py-2.5 text-sm font-medium text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
            >
              {t.common.exploreMore}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div ref={statsRef} className="mt-12 sm:mt-14">
          <Reveal>
            <dl className="grid overflow-hidden rounded-[1.75rem] bg-[#0c0c0c] ring-1 ring-white/10 dark:bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-4">
              {t.snapshot.stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`relative px-6 py-8 sm:px-8 sm:py-10 ${
                    index > 0 ? "border-t border-white/10 lg:border-t-0 lg:border-l" : ""
                  } ${index % 2 === 1 ? "sm:border-l" : ""} ${
                    index === 1 ? "sm:border-t-0" : ""
                  }`}
                >
                  <dt className="font-sans text-[2.4rem] font-semibold leading-none tracking-tight text-white tabular-nums sm:text-[2.85rem]">
                    {stat.animate ? (
                      <CountUp value={stat.value} start={shown} />
                    ) : (
                      <span className="text-brand-orange">{stat.value}</span>
                    )}
                  </dt>
                  <dd className="mt-3 max-w-[10.5rem] text-sm leading-snug text-white/55">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-14">
          <p className="text-[15px] leading-[1.8] text-ink/65">
            {t.snapshot.commitment}
          </p>
          <p className="text-[15px] leading-[1.8] text-ink/65">
            {t.snapshot.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
