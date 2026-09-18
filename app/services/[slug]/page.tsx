import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ServiceDetail } from "@/components/pages/ServiceDetail";
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

  return (
    <PageShell expertBand={SERVICE_PAGES[params.slug] ? "muted" : "canvas"}>
      <ServiceDetail slug={params.slug} />
    </PageShell>
  );
}

export const dynamicParams = false;
