import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/data";
import { SERVICE_PAGES } from "@/lib/service-pages";

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const page = SERVICE_PAGES[service.slug];
  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <PageShell>
      <section
        id="services"
        className="band-canvas relative scroll-mt-24 overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-40"
      >
        <div className="section-shell relative max-w-3xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
            Service
          </p>
          <h1 className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.5rem]">
            {service.title}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-ink/70 sm:text-base">
            {service.overview}
          </p>
          {page ? (
            <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
              {page.problem}
            </p>
          ) : null}

          <div className="mt-8">
            <CalendlyCTAButton>
              Book a Consultation
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
          <section className="band-muted relative overflow-hidden py-16 sm:py-20">
            <div className="section-shell relative">
              <SectionHeading
                title="Problems we take on"
                description="Where this work starts — and why teams bring it to us."
              />
              <Reveal
                stagger
                className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3"
              >
                {page.challenges.map((item) => (
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

          <section className="band-canvas relative overflow-hidden py-16 sm:py-20">
            <div className="section-shell">
              <SectionHeading
                title="How we work"
                description={`A delivery path built for ${service.title}.`}
              />
              <Reveal
                stagger
                className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3"
              >
                {page.method.map((item, i) => (
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

          <section className="band-muted relative overflow-hidden py-16 sm:py-20">
            <div className="section-shell relative">
              <SectionHeading
                title="Typical work"
                description="Where teams use this service in production."
              />
              <Reveal
                stagger
                className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3"
              >
                {page.useCases.map((item) => (
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

              <p className="mb-4 mt-12 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
                Tools and capabilities
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

      <section className="band-canvas relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <SectionHeading title="What you get" />
          <Reveal stagger className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2">
            {service.deliverables.map((deliverable) => (
              <div key={deliverable} className="card-on-canvas flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <p className="text-sm leading-relaxed text-ink/70">{deliverable}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="band-muted relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <SectionHeading title="Explore other services" />
          <Reveal
            stagger
            className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3"
          >
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="card-on-muted group flex h-full flex-col"
              >
                <div className="flex items-start justify-between gap-3">
                  <s.icon className="h-5 w-5 text-brand-orange" />
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/30 transition-colors group-hover:text-brand-orange" />
                </div>
                <h3 className="mt-4 font-sans text-base font-semibold text-ink">
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
    </PageShell>
  );
}

export const dynamicParams = false;
