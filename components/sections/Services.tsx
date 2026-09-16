"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES, FEATURED_SERVICE_SLUGS, TECH_STACK } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { locService } from "@/lib/i18n/localize";
import { setSpot } from "@/lib/spot";
import type { TechStackItem } from "@/lib/types";

const SERVICE_TECH: Record<string, string[]> = {
  "artificial-intelligence": [
    "PyTorch",
    "TensorFlow",
    "Python",
    "Hugging Face",
    "LangChain",
  ],
  saas: ["Angular", "React", "TypeScript", "Next.js", "Node.js"],
  "mobile-development": ["Flutter", "Android", "iOS"],
  design: ["Figma", "React", "TypeScript"],
  "staff-augmentation": ["Flutter", "Android", "iOS", "React"],
  ecommerce: ["Shopify", "WordPress", "Next.js"],
  "web3-development": ["Ethereum", "Solidity", "Next.js"],
  cms: ["WordPress", "Next.js", "React"],
  "digital-marketing": ["Figma", "Next.js", "React"],
};

function techsFor(slug: string): TechStackItem[] {
  const names = SERVICE_TECH[slug] ?? [];
  return names
    .map((name) => TECH_STACK.find((item) => item.name === name))
    .filter((item): item is TechStackItem => Boolean(item));
}

function ServiceCard({
  slug,
  title,
  description,
  icon: Icon,
  index,
  featured = false,
}: (typeof SERVICES)[number] & { index: number; featured?: boolean }) {
  const { t } = useLocale();
  const techs = techsFor(slug);
  const n = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/services/${slug}`}
      onMouseMove={setSpot}
      className={`fx-spot group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 ${
        featured ? "card-dark" : "card-on-canvas"
      }`}
    >
      <span aria-hidden className="index-ghost">
        {n}
      </span>
      <div className="flex items-start justify-between gap-3">
        <span className="icon-chip">
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`font-sans text-[11px] font-semibold tracking-[0.18em] ${
            featured ? "text-white/35" : "text-ink/30"
          }`}
        >
          {n}
        </span>
      </div>
      <h3
        className={`mt-6 font-sans text-lg font-semibold sm:text-xl ${
          featured ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h3>
      <p
        className={`mt-2 text-sm leading-relaxed ${
          featured ? "text-white/65" : "text-ink/70"
        }`}
      >
        {description}
      </p>
      {techs.length > 0 && (
        <ul className="mt-6 flex flex-wrap items-center gap-3">
          {techs.map((tech) => (
            <li key={tech.name} title={tech.name}>
              <tech.icon
                className={`h-6 w-6 opacity-80 transition-opacity duration-300 group-hover:opacity-100 sm:h-7 sm:w-7 ${
                  tech.color ? "" : featured ? "text-white" : "text-ink dark:text-white"
                }`}
                style={tech.color ? { color: tech.color } : undefined}
                aria-hidden
              />
              <span className="sr-only">{tech.name}</span>
            </li>
          ))}
        </ul>
      )}
      <span
        className={`mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium ${
          featured ? "text-brand-orange" : "text-brand-orange"
        }`}
      >
        {t.common.viewDetails}
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function Services({
  detailHref,
  featured = false,
}: {
  detailHref?: string;
  featured?: boolean;
}) {
  const { t } = useLocale();
  const items = featured
    ? FEATURED_SERVICE_SLUGS.map(
        (slug) => SERVICES.find((s) => s.slug === slug),
      ).filter((s): s is (typeof SERVICES)[number] => Boolean(s))
    : SERVICES;
  const localized = items.map((s) => locService(t, s));

  return (
    <section
      id="services"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          index={featured ? "03" : undefined}
          title={t.services.title}
          description={t.services.description}
          detailHref={featured ? detailHref : undefined}
          detailLabel={t.common.exploreMore}
        />

        {featured ? (
          <Reveal stagger className="mt-10 grid gap-4 lg:grid-cols-6">
            {localized.map((service, index) => (
              <motion.div
                key={service.slug}
                variants={revealItem}
                className={index < 2 ? "lg:col-span-3" : "lg:col-span-2"}
              >
                <ServiceCard {...service} index={index} featured={index === 0} />
              </motion.div>
            ))}
          </Reveal>
        ) : (
          <Reveal
            stagger
            className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {localized.map((service, index) => (
              <motion.div key={service.slug} variants={revealItem}>
                <ServiceCard {...service} index={index} />
              </motion.div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
