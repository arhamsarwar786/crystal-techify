"use client";

import Link from "next/link";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { Contact } from "@/components/sections/Contact";
import { BandDecor } from "@/components/ui/BandDecor";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/data";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { fmt, useLocale } from "@/lib/i18n";
import { locService } from "@/lib/i18n/localize";
import { setSpot } from "@/lib/spot";

export function ServiceDetail({ slug }: { slug: string }) {
  const { t } = useLocale();
  const raw = SERVICES.find((s) => s.slug === slug);
  if (!raw) return null;
  const service = locService(t, raw);
  const copy = t.serviceItems[slug];
  const page = SERVICE_PAGES[slug];
  const problem = copy?.problem ?? page?.problem;
  const challenges = copy?.challenges ?? page?.challenges;
  const method = copy?.method ?? page?.method;
  const useCases = copy?.useCases ?? page?.useCases;
  const otherServices = SERVICES.filter((s) => s.slug !== slug).map((s) =>
    locService(t, s),
  );

  return (
    <>
      <section
        id="services"
        className="band-canvas relative scroll-mt-24 overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-36"
      >
        <BandDecor />
        <div className="section-shell relative max-w-3xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-orange">
            {t.common.service}
          </p>
          <h1 className="mt-3 font-sans text-[1.85rem] font-semibold leading-[1.2] tracking-tight text-ink sm:text-[2.5rem]">
            {service.title}
          </h1>
          <span
            aria-hidden
            className="mt-4 block h-px w-9 bg-brand-orange"
          />
          <p className="mt-5 text-sm leading-relaxed text-ink/70 sm:text-base">
            {service.overview}
          </p>
          {problem ? (
            <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
              {problem}
            </p>
          ) : null}

          <div className="mt-8">
            <CalendlyCTAButton>
              {t.bookDemo}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </CalendlyCTAButton>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {service.capabilities.map((cap) => (
              <li
                key={cap}
                className="rounded-full bg-[#F3F4F6] px-3 py-1.5 text-xs text-ink/65 dark:bg-white/[0.06]"
              >
                {cap}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {page ? (
        <>
          <section className="band-muted relative overflow-hidden py-20 sm:py-24">
            <BandDecor />
            <div className="section-shell relative">
              <SectionHeading
                title={t.common.problemsWeTake}
                description={t.common.problemsWeTakeBody}
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
                description={fmt(t.common.howWeWorkService, {
                  name: service.title,
                })}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
                {(method ?? []).map((item, i) => {
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
              <SectionHeading
                title={t.common.typicalWork}
                description={t.common.typicalWorkBody}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
                {(useCases ?? []).map((item, i) => (
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

              <p className="mb-4 mt-12 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                {t.common.tools}
              </p>
              <ul className="flex flex-wrap gap-2">
                {page.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-white px-3.5 py-1.5 text-xs text-ink/65 dark:bg-white/[0.06]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : null}

      <section className="band-canvas relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading title={t.common.whatYouGet} />
          <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
            {service.deliverables.map((deliverable) => (
              <div
                key={deliverable}
                onMouseMove={setSpot}
                className="card-on-canvas fx-spot flex items-start gap-3"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <p className="text-sm leading-relaxed text-ink/70">{deliverable}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="band-muted relative overflow-hidden py-20 sm:py-24 lg:py-28">
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading title={t.common.otherServices} />
          <Reveal
            stagger
            className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onMouseMove={setSpot}
                className="card-on-muted fx-spot group flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="icon-chip">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/30 transition-colors group-hover:text-brand-orange" />
                </div>
                <h3 className="mt-6 font-sans text-lg font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/70">
                  {s.description}
                </p>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  );
}
