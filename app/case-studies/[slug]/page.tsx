import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, ImageOff } from "lucide-react";
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
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="section-shell relative max-w-3xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-ink/55 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            All case studies
          </Link>
          <p className="mt-8 font-display text-[10px] uppercase tracking-[0.22em] text-brand-orange">
            {project.category} · {project.client}
          </p>
          <h1 className="mt-3 text-[1.75rem] sm:text-4xl">{project.name}</h1>
          <p className="mt-5 text-sm leading-relaxed text-ink/65 sm:text-base">
            {project.summary}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink/60">
            <span className="text-ink/80">Outcome: </span>
            {project.outcome}
          </p>
          <p className="mt-3 text-xs text-ink/45">
            {project.timeline} · {project.teamSize}
          </p>

          <div className="mt-10">
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={project.name}
                className="w-full rounded-2xl border border-ink/10"
              />
            ) : (
              <div className="flex min-h-[14rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 bg-ink/[0.03] text-ink/40">
                <ImageOff className="h-8 w-8" />
                <p className="text-sm">Project image to be supplied</p>
              </div>
            )}
          </div>

          {project.pdf ? (
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2.5 text-sm text-ink hover:border-brand-orange/40"
            >
              <FileText className="h-4 w-4 text-brand-orange" />
              Open case-study PDF
            </a>
          ) : (
            <p className="mt-6 text-sm text-ink/40">
              PDF case study forthcoming — send the file to add it here.
            </p>
          )}

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-ink/10 bg-ink/5 px-3 py-1 text-xs text-ink/60"
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
