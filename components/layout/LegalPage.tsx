import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}

export function LegalPage({ title, updated, intro, children }: LegalPageProps) {
  return (
    <PageShell>
      <div className="section-shell pb-24 pt-36 sm:pt-40">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-ink/55 transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="mt-8 text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-ink/45">Last updated {updated}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65">
          {intro}
        </p>

        <div className="legal-prose mt-10 max-w-2xl space-y-8">{children}</div>
      </div>
    </PageShell>
  );
}

interface SectionProps {
  heading: string;
  children: ReactNode;
}

export function LegalSection({ heading, children }: SectionProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/65">
        {children}
      </div>
    </section>
  );
}
