"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal, revealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES, FEATURED_SERVICE_SLUGS, TECH_STACK } from "@/lib/data";
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
}: (typeof SERVICES)[number]) {
  const techs = techsFor(slug);

  return (
    <Link
      href={`/services/${slug}`}
      className="card-on-canvas group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
    >
      <div className="flex items-start gap-2.5">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
        <div className="min-w-0">
          <h3 className="font-sans text-base font-semibold text-brand-orange sm:text-[17px]">
            {title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
            {description}
          </p>
        </div>
      </div>
      {techs.length > 0 && (
        <ul className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          {techs.map((tech) => (
            <li key={tech.name} title={tech.name}>
              <tech.icon
                className={`h-7 w-7 sm:h-8 sm:w-8 ${tech.color ? "" : "text-ink dark:text-white"}`}
                style={tech.color ? { color: tech.color } : undefined}
                aria-hidden
              />
              <span className="sr-only">{tech.name}</span>
            </li>
          ))}
        </ul>
      )}
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
  const items = featured
    ? FEATURED_SERVICE_SLUGS.map(
        (slug) => SERVICES.find((s) => s.slug === slug),
      ).filter((s): s is (typeof SERVICES)[number] => Boolean(s))
    : SERVICES;

  const featuredTop = featured ? items.slice(0, 2) : [];
  const featuredBottom = featured ? items.slice(2) : [];

  return (
    <section
      id="services"
      className="band-canvas relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="Services That Empower You"
          description="Gain access to services that drive growth and fuel success."
          detailHref={featured ? detailHref : undefined}
        />

        {featured ? (
          <div className="mt-8 grid gap-4 sm:mt-10">
            <Reveal stagger className="grid gap-4 lg:grid-cols-2">
              {featuredTop.map((service) => (
                <motion.div key={service.slug} variants={revealItem}>
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </Reveal>
            <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBottom.map((service) => (
                <motion.div key={service.slug} variants={revealItem}>
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </Reveal>
          </div>
        ) : (
          <Reveal
            stagger
            className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((service) => (
              <motion.div key={service.slug} variants={revealItem}>
                <ServiceCard {...service} />
              </motion.div>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
