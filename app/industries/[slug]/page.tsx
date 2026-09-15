import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
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
      <section className="band-canvas relative scroll-mt-24 overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-40">
        <div className="section-shell relative max-w-3xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
            Industry
          </p>
          <h1 className="mt-3 text-[1.75rem] leading-[1.2] sm:text-[2.5rem]">
            {industry.name}
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-ink/70 sm:text-base">
            {page?.overview ?? industry.description}
          </p>
          <div className="mt-8">
            <CalendlyCTAButton>Book a Consultation</CalendlyCTAButton>
          </div>
        </div>
      </section>

      {page ? (
        <>
          <section className="band-muted relative py-16 sm:py-20">
            <div className="section-shell">
              <SectionHeading
                title="Problems we see"
                description={`Where teams get stuck in ${industry.name}.`}
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

          <section className="band-canvas relative py-16 sm:py-20">
            <div className="section-shell">
              <SectionHeading
                title="How we work"
                description="A delivery path for this domain."
              />
              <Reveal
                stagger
                className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3"
              >
                {page.approach.map((item, i) => (
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

          <section className="band-muted relative py-16 sm:py-20">
            <div className="section-shell">
              <SectionHeading title="Outcomes we aim for" />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {page.outcomes.map((item) => (
                  <li key={item} className="card-on-muted text-sm text-ink/75">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      ) : null}

      <section className="band-muted relative py-16 sm:py-20">
        <div className="section-shell">
          <SectionHeading title="Other industries" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/industries/${item.slug}`}
                  className="card-on-muted group flex items-center justify-between gap-3"
                >
                  <span className="font-sans text-sm font-semibold text-ink">
                    {item.name}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/30 transition-colors group-hover:text-brand-orange" />
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
