"use client";

import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { BandDecor } from "@/components/ui/BandDecor";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceArt } from "@/components/ui/ServiceArt";
import { SiteCard } from "@/components/ui/SiteCard";
import { SERVICES } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { locService } from "@/lib/i18n/localize";
import type { Service } from "@/lib/types";

function ServiceCard({
  slug,
  title,
  description,
  className,
}: {
  slug: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <SiteCard
      href={`/services/${slug}`}
      title={title}
      description={description}
      art={<ServiceArt slug={slug} />}
      className={className}
    />
  );
}

function ServiceRail({ items }: { items: Service[] }) {
  const loop = [...items, ...items];

  return (
    <div className="group/services relative">
      <div className="mask-fade-x overflow-hidden py-1">
        <div data-service-rail className="service-marquee-track flex w-max gap-4">
          {loop.map((service, index) => (
            <div
              key={`${service.slug}-${index}`}
              className="w-[18.75rem] shrink-0 sm:w-[20.5rem]"
            >
              <ServiceCard
                slug={service.slug}
                title={service.title}
                description={service.description}
                className="min-h-[26.5rem]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Services({
  detailHref,
  featured = false,
  pageStart = false,
}: {
  detailHref?: string;
  featured?: boolean;
  pageStart?: boolean;
}) {
  const { t } = useLocale();
  const localized = SERVICES.map((s) => locService(t, s));
  const headline = t.services.headline ?? t.services.title;
  const accent = t.services.headlineAccent ?? "";

  return (
    <section
      id="services"
      className={`band-muted relative scroll-mt-24 overflow-hidden pb-16 sm:pb-20 lg:pb-24 ${
        pageStart ? "pt-28 sm:pt-36" : "pt-8 sm:pt-10 lg:pt-12"
      }`}
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker={t.services.kicker ?? t.services.title}
          title={
            <>
              {headline}{" "}
              {accent ? (
                <span className="text-brand-orange">{accent}</span>
              ) : null}
            </>
          }
          titleClassName="sm:whitespace-nowrap"
          description={t.services.description}
          detailHref={detailHref}
          detailLabel={t.services.exploreAll ?? t.services.discoverCapabilities}
        />
      </div>

      {featured ? (
        <div className="relative mt-10 sm:mt-12">
          <ServiceRail items={localized} />
        </div>
      ) : (
        <div className="section-shell relative">
          <Reveal
            stagger
            className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {localized.map((service) => (
              <motion.div key={service.slug} variants={revealItem}>
                <ServiceCard
                  slug={service.slug}
                  title={service.title}
                  description={service.description}
                />
              </motion.div>
            ))}
          </Reveal>
        </div>
      )}
    </section>
  );
}
