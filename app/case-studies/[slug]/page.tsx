import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { CaseDetail } from "@/components/pages/CaseDetail";
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
      <CaseDetail slug={params.slug} />
    </PageShell>
  );
}

export const dynamicParams = false;
