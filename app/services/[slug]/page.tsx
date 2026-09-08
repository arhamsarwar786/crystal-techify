import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
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
          className="relative scroll-mt-24 overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-40"
        >
          <div
            aria-hidden
            className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-red/20 blur-[100px] sm:h-[32rem] sm:w-[32rem] sm:blur-[130px]"
          />

          <div className="section-shell relative">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-ink/55 transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to services
            </Link>

            <div className="mx-auto mt-8 max-w-3xl text-center">
              <div
                className={`mx-auto inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${service.accent} shadow-glow-sm`}
              >
                <service.icon className="h-7 w-7 text-obsidian" />
              </div>

              <p className="mt-5 font-display text-[10px] uppercase tracking-[0.22em] text-ink/45">
                Service
              </p>
              <h1 className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.75rem] sm:leading-[1.18]">
                {service.title}
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink/65 sm:text-lg">
                {service.overview}
              </p>
              {page && (
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink/55 sm:text-base">
                  {page.problem}
                </p>
              )}

              <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
                <CalendlyCTAButton className="w-full sm:w-auto">
                  Book a Consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </CalendlyCTAButton>
              </div>

              <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2">
                {service.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="rounded-full border border-ink/10 bg-ink/5 px-3 py-1.5 text-xs text-ink/65"
                  >
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {page && (
          <>
            <section className="relative overflow-hidden py-16 sm:py-20">
              <div className="section-shell relative">
                <SectionHeading
                  eyebrow="Where this work starts"
                  title={
                    <>
                      Problems we{" "}
                      <span className="gradient-text">take on</span>
                    </>
                  }
                />
                <Reveal
                  stagger
                  className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3"
                >
                  {page.challenges.map((item) => (
                    <div
                      key={item.title}
                      className="glass gradient-border rounded-2xl p-5 sm:p-6"
                    >
                      <h3 className="text-base text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/60">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </Reveal>
              </div>
            </section>

            <section className="relative overflow-hidden py-16 sm:py-20">
              <div className="section-shell">
                <SectionHeading
                  eyebrow="How we work"
                  title={
                    <>
                      A delivery path built for{" "}
                      <span className="gradient-text">{service.title}</span>
                    </>
                  }
                />
                <Reveal
                  stagger
                  className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3"
                >
                  {page.method.map((item, i) => (
                    <div
                      key={item.title}
                      className="glass rounded-2xl p-5 sm:p-6"
                    >
                      <span className="font-display text-xs tracking-[0.18em] text-brand-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 text-base text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/60">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </Reveal>
              </div>
            </section>

            <section className="relative overflow-hidden py-16 sm:py-20">
              <div className="section-shell relative">
                <SectionHeading
                  eyebrow="Typical work"
                  title={
                    <>
                      Where teams use this{" "}
                      <span className="gradient-text">service</span>
                    </>
                  }
                />
                <Reveal
                  stagger
                  className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-3"
                >
                  {page.useCases.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-5"
                    >
                      <h3 className="text-base text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/60">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </Reveal>

                <div className="mt-12">
                  <p className="mb-4 text-center font-display text-[10px] uppercase tracking-[0.22em] text-ink/40">
                    Tools and capabilities
                  </p>
                  <ul className="flex flex-wrap items-center justify-center gap-2">
                    {page.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-ink/10 bg-ink/5 px-3.5 py-1.5 text-xs text-ink/65"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}

        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="section-shell">
            <Reveal>
              <h2 className="mx-auto max-w-xl text-center text-2xl sm:text-3xl">
                What you get
              </h2>
            </Reveal>

            <Reveal
              stagger
              className="mx-auto mt-10 grid max-w-3xl gap-3 sm:mt-12"
            >
              {service.deliverables.map((deliverable) => (
                <div
                  key={deliverable}
                  className="glass gradient-border flex items-start gap-3 rounded-2xl p-4 sm:p-5"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-obsidian">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm leading-relaxed text-ink/70 sm:text-[15px]">
                    {deliverable}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
          <div className="section-shell">
            <Reveal>
              <h2 className="text-center text-2xl sm:text-3xl">
                Explore other services
              </h2>
            </Reveal>

            <Reveal
              stagger
              className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
            >
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
                >
                  <TiltCard className="glass gradient-border group h-full p-5">
                    <div
                      className={`inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.accent}`}
                    >
                      <s.icon className="h-5 w-5 text-obsidian" />
                    </div>
                    <h3 className="mt-4 text-base leading-snug text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink/55">
                      {s.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-brand-orange opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Learn more
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </TiltCard>
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
