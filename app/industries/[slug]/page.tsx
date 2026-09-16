import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { IndustryDetail } from "@/components/pages/IndustryDetail";
import { INDUSTRIES } from "@/lib/data";

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

  return (
    <PageShell>
      <IndustryDetail slug={params.slug} />
    </PageShell>
  );
}
