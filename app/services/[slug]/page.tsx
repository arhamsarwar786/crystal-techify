import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ServiceDetail } from "@/components/pages/ServiceDetail";
import { SERVICES } from "@/lib/data";

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

  return (
    <PageShell>
      <ServiceDetail slug={params.slug} />
    </PageShell>
  );
}

export const dynamicParams = false;
