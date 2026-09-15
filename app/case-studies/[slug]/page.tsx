import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PORTFOLIO_ITEMS } from "@/lib/data";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const item = PORTFOLIO_ITEMS.find((p) => p.slug === params.slug);
  if (!item) return {};
  return { title: item.name, description: item.summary };
}

export default function CaseStudyPage({ params }: PageProps) {
  const project = PORTFOLIO_ITEMS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <PageShell>
      <section className="band-canvas relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="section-shell relative max-w-3xl">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
            {project.category} · {project.client}
          </p>
          <h1 className="mt-3 text-[1.75rem] sm:text-4xl">{project.name}</h1>
          <p className="mt-5 text-sm leading-relaxed text-ink/70 sm:text-base">
            {project.summary}
          </p>

          <div className="card-on-canvas mt-8">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
              Outcome
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
              {project.outcome}
            </p>
            <p className="mt-4 text-xs text-ink/45">
              {project.timeline} · {project.teamSize}
            </p>
          </div>

          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.name}
              className="mt-8 w-full rounded-2xl"
            />
          ) : null}

          {project.pdf ? (
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-orange hover:text-ink"
            >
              <FileText className="h-4 w-4" />
              Open case-study PDF
            </a>
          ) : null}

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs text-ink/60 dark:bg-white/[0.06]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}

export const dynamicParams = false;
