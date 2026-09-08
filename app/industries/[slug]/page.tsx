import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { Contact } from "@/components/sections/Contact";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { INDUSTRIES } from "@/lib/data";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";

interface IndustryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export function generateMetadata({ params }: IndustryPageProps): Metadata {
  const industry = INDUSTRIES.find((i) => i.slug === params.slug);
  if (!industry) return {};
  return {
    title: industry.name,
    description: industry.description,
  };
}

export default function IndustryPage({ params }: IndustryPageProps) {
  const industry = INDUSTRIES.find((i) => i.slug === params.slug);
  if (!industry) notFound();

  const page = INDUSTRY_PAGES[industry.slug];
  const others = INDUSTRIES.filter((i) => i.slug !== industry.slug);

  return (
    <PageShell>
      <section className="relative scroll-mt-24 overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div className="section-shell relative mx-auto max-w-3xl">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm text-ink/55 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            All industries
          </Link>

          <div className="mt-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink/5 text-brand-red">
              <industry.icon className="h-7 w-7" />
            </span>
            <p className="mt-5 font-display text-[10px] uppercase tracking-[0.22em] text-ink/45">
              Industry
            </p>
            <h1 className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.75rem]">
              {industry.name}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-ink/65 sm:text-lg">
              {page?.overview ?? industry.description}
            </p>
            <div className="mt-8 flex justify-center">
              <CalendlyCTAButton>Book a Consultation</CalendlyCTAButton>
            </div>
          </div>
        </div>
      </section>

      {page && (
        <>
          <section className="relative py-16 sm:py-20">
            <div className="section-shell">
              <SectionHeading
                eyebrow="Where teams get stuck"
                title={
                  <>
                    Problems we see in{" "}
                    <span className="gradient-text">{industry.name}</span>
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

          <section className="relative py-16 sm:py-20">
            <div className="section-shell">
              <SectionHeading
                eyebrow="How we work"
                title={
                  <>
                    A delivery path for this{" "}
                    <span className="gradient-text">domain</span>
                  </>
                }
              />
              <Reveal
                stagger
                className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3"
              >
                {page.approach.map((item, i) => (
                  <div key={item.title} className="glass rounded-2xl p-5 sm:p-6">
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

          <section className="relative py-16 sm:py-20">
            <div className="section-shell max-w-3xl">
              <SectionHeading
                align="left"
                eyebrow="What good looks like"
                title="Outcomes we aim for"
              />
              <ul className="mt-8 space-y-3">
                {page.outcomes.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      <section className="relative pb-8 sm:pb-12">
        <div className="section-shell">
          <p className="font-display text-[10px] uppercase tracking-[0.22em] text-ink/45">
            Other industries
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/industries/${item.slug}`}
                  className="inline-flex items-center gap-1 rounded-full border border-ink/10 px-3 py-1.5 text-sm text-ink/70 hover:text-ink"
                >
                  {item.name}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Contact />
    </PageShell>
  );
}
