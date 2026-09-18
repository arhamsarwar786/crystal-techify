"use client";

import { ArrowRight, Check } from "lucide-react";
import { Contact } from "@/components/sections/Contact";
import { BandDecor } from "@/components/ui/BandDecor";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceArt } from "@/components/ui/ServiceArt";
import { SiteCard } from "@/components/ui/SiteCard";
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
  const extras = Boolean(page);
  const deliverableBand = extras ? "canvas" : "muted";
  const otherBand = extras ? "muted" : "canvas";
  const contactBand = extras ? "canvas" : "muted";

  return (
    <>
      <section
        id="services"
        className="band-canvas relative scroll-mt-24 overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36"
      >
        <BandDecor />
        <div className="section-shell relative">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
                <span aria-hidden className="h-px w-6 bg-brand-orange" />
                {t.common.service}
              </p>
              <h1 className="mt-3 font-sans text-[1.85rem] font-semibold leading-[1.2] tracking-[-0.03em] text-ink sm:text-[2.5rem]">
                {service.title}
              </h1>
              <p className="mt-5 text-[15px] leading-[1.75] text-ink/60 sm:text-base">
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
            </div>

            <Reveal
              stagger
              className="grid gap-4 sm:grid-cols-2 lg:col-span-5"
            >
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange sm:col-span-2">
                {t.common.whereWeFocus}
              </p>
              {service.capabilities.map((cap) => (
                <div
                  key={cap}
                  onMouseMove={setSpot}
                  className="card-on-canvas card-compact fx-spot"
                >
                  <h2 className="font-sans text-base font-semibold tracking-tight text-ink">
                    {cap}
                  </h2>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {page ? (
        <>
          <section className="band-muted relative overflow-hidden py-16 sm:py-20">
            <BandDecor />
            <div className="section-shell relative">
              <SectionHeading
                title={t.common.problemsWeTake}
                description={t.common.problemsWeTakeBody}
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
                description={fmt(t.common.howWeWorkService, {
                  name: service.title,
                })}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3">
                {(method ?? []).map((item) => (
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
              <SectionHeading
                title={t.common.typicalWork}
                description={t.common.typicalWorkBody}
              />
              <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
                {(useCases ?? []).map((item) => (
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

      <section
        className={`${deliverableBand === "muted" ? "band-muted" : "band-canvas"} relative overflow-hidden py-16 sm:py-20`}
      >
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading title={t.common.whatYouGet} />
          <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
            {service.deliverables.map((deliverable) => (
              <div
                key={deliverable}
                onMouseMove={setSpot}
                className={`${deliverableBand === "muted" ? "card-on-muted" : "card-on-canvas"} fx-spot flex items-start gap-3`}
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <p className="text-sm leading-relaxed text-ink/70">{deliverable}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        className={`${otherBand === "muted" ? "band-muted" : "band-canvas"} relative overflow-hidden py-16 sm:py-20`}
      >
        <BandDecor />
        <div className="section-shell relative">
          <SectionHeading kicker="Services" title={t.common.otherServices} />
          <Reveal
            stagger
            className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {otherServices.map((s) => (
              <SiteCard
                key={s.slug}
                href={`/services/${s.slug}`}
                title={s.title}
                description={s.description}
                art={<ServiceArt slug={s.slug} />}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <Contact band={contactBand} />
    </>
  );
}
