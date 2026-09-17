import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { BandDecor } from "@/components/ui/BandDecor";

interface LegalPageProps {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}

export function LegalPage({ title, updated, intro, children }: LegalPageProps) {
  return (
    <PageShell>
      <section className="band-canvas relative overflow-hidden pb-24 pt-28 sm:pt-36">
        <BandDecor />
        <div className="section-shell relative">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-orange">
            Legal
          </p>
          <h1 className="mt-3 max-w-2xl font-sans text-[1.85rem] font-semibold tracking-tight text-ink sm:text-[2.5rem]">
            {title}
          </h1>
          <span
            aria-hidden
            className="mt-4 block h-px w-9 bg-brand-orange"
          />
          <p className="mt-2 text-sm text-ink/45">Last updated {updated}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/65">
            {intro}
          </p>

          <div className="legal-prose mt-10 max-w-2xl space-y-8">{children}</div>
        </div>
      </section>
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
      <h2 className="font-sans text-lg font-semibold text-ink">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/65">
        {children}
      </div>
    </section>
  );
}
