"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BandDecor } from "@/components/ui/BandDecor";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

export const CAREERS_HERO = "/careers/hero.jpg";

export function CareersLanding() {
  const { t } = useLocale();

  return (
    <>
      <section className="relative isolate min-h-[28rem] overflow-hidden bg-black sm:min-h-[34rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CAREERS_HERO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="section-shell relative flex min-h-[28rem] flex-col justify-end pb-16 pt-32 sm:min-h-[34rem] sm:pb-20 sm:pt-40">
          <p className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
            <span aria-hidden className="h-px w-6 bg-brand-orange" />
            {t.careers.kicker}
          </p>
          <h1 className="mt-4 max-w-3xl font-sans text-[2rem] font-semibold tracking-[-0.03em] text-white sm:text-[3rem] sm:leading-[1.08]">
            {t.careers.title}
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-white/80 sm:text-base">
            {t.careers.body}
          </p>
          <Link
            href="/careers/jobs"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 font-sans text-sm font-semibold tracking-[0.04em] text-white transition-colors hover:bg-brand-orange/90"
          >
            {t.common.viewOpenRoles}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="band-muted relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading
            kicker={t.careers.storyKicker}
            title={t.careers.storyTitle}
            description={t.careers.story}
            detailHref="/careers/jobs"
            detailLabel={t.common.viewOpenRoles}
          />
          <Reveal stagger className="mt-10 grid gap-4 sm:grid-cols-3">
            {t.careers.highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-muted fx-spot"
              >
                <h3 className="font-sans text-[1.25rem] font-semibold leading-snug tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </Reveal>
          <Reveal
            stagger
            className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {t.careers.facts.map((item) => (
              <motion.div
                key={item.label}
                variants={revealItem}
                className="card-on-muted"
              >
                <p className="font-sans text-lg font-semibold tracking-tight text-ink sm:text-xl">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-ink/50">{item.label}</p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="band-canvas relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading
            kicker={t.careers.teamsKicker}
            title={t.careers.teamsTitle}
            description={t.careers.teamsBody}
          />
          <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
            {t.careers.teams.map((item) => (
              <motion.div
                key={item.title}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-canvas fx-spot"
              >
                <h3 className="font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="band-muted relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading
            kicker={t.careers.cultureKicker}
            title={t.careers.cultureTitle}
            description={t.careers.cultureBody}
          />
          <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
            {t.careers.culture.map((item) => (
              <motion.div
                key={item.title}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-muted fx-spot"
              >
                <h3 className="font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="band-canvas relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading
            kicker={t.careers.hiringKicker}
            title={t.careers.hiringTitle}
            description={t.careers.hiringBody}
            detailHref="/careers/jobs"
            detailLabel={t.common.viewOpenRoles}
          />
          <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.careers.hiring.map((item) => (
              <motion.div
                key={item.title}
                variants={revealItem}
                onMouseMove={setSpot}
                className="card-on-canvas fx-spot flex h-full flex-col"
              >
                <h3 className="font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/55">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
