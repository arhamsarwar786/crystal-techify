"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Calendar, Layers, ShieldCheck, Users } from "lucide-react";
import { BandDecor } from "@/components/ui/BandDecor";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

const STAT_ICONS = [Calendar, Layers, Users, ShieldCheck] as const;

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
      className="band-muted relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <BandDecor />

      <div className="section-shell relative">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-orange">
              02 · {t.snapshot.kicker}
            </p>
            <h2
              id="snapshot-heading"
              className="mt-3 font-sans text-[1.9rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2.55rem] sm:leading-[1.12]"
            >
              {titleParts.length === 2 ? (
                <>
                  <span className="block">{titleParts[0]}</span>
                  <span className="mt-1 block text-ink/45">{titleParts[1]}</span>
                </>
              ) : (
                titleParts[0]
              )}
            </h2>
            <span aria-hidden className="heading-accent" />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-[15px] leading-[1.75] text-ink/65">
              {t.snapshot.description}
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-orange transition-colors hover:text-ink"
            >
              {t.common.exploreMore}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div ref={statsRef}>
          <Reveal
            stagger
            className="mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4"
          >
            {t.snapshot.stats.map((stat, index) => {
              const Icon = STAT_ICONS[index] ?? Layers;
              const n = String(index + 1).padStart(2, "0");
              return (
                <motion.div
                  key={stat.label}
                  variants={revealItem}
                  onMouseMove={setSpot}
                  className="card-on-muted fx-spot"
                >
                  <span aria-hidden className="index-ghost">
                    {n}
                  </span>
                  <div className="flex items-start justify-between gap-3">
                    <span className="icon-chip">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-sans text-[11px] font-semibold tracking-[0.18em] text-ink/30">
                      {n}
                    </span>
                  </div>
                  <p className="mt-8 font-sans text-[2.35rem] font-semibold tracking-tight text-ink sm:text-[2.75rem]">
                    {stat.animate ? (
                      <CountUp value={stat.value} start={shown} />
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mt-3 max-w-[11rem] text-sm leading-snug text-ink/55">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mt-14 max-w-3xl sm:mt-16">
          <blockquote className="border-l border-brand-orange pl-6 sm:pl-8">
            <p className="text-[15px] leading-[1.8] text-ink/70">
              {t.snapshot.commitment}
            </p>
            <p className="mt-4 text-[15px] leading-[1.8] text-ink/70">
              {t.snapshot.closing}
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
