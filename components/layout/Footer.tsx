"use client";

import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import {
  COMPANY,
  FEATURED_SERVICE_SLUGS,
  LEGAL_LINKS,
  SERVICES,
  SOCIAL_LINKS,
} from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { locService } from "@/lib/i18n/localize";

const SOCIAL_ICONS = {
  LinkedIn: Linkedin,
  X: Twitter,
  GitHub: Github,
} as const;

const FOOTER_BADGES = [
  {
    id: "clutch" as const,
    href: "https://clutch.co",
    mark: "/badges/clutch-mark.png",
    markW: 180,
    markH: 204,
    title: "On Top Charts",
    year: "2023",
    body: "Top Blockchain Consulting Company",
  },
  {
    id: "iso" as const,
    mark: "/badges/iso-mark.png",
    markW: 152,
    markH: 152,
    title: "ISO Certified",
    year: "27001",
    body: "ISO 27001: 2013 Certified by: RICI",
  },
  {
    id: "upwork" as const,
    href: "https://www.upwork.com",
    mark: "/badges/upwork-mark.svg",
    title: "Top Rated Plus",
    year: "2023",
    body: 'Ranked "Top Rated Plus" on Upwork',
  },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
  { label: "How we work", href: "/process" },
  { label: "Contact Us", href: "/contact" },
] as const;

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
      {children}
    </h3>
  );
}

function BadgeShield({
  variant,
  children,
}: {
  variant: "clutch" | "iso" | "upwork";
  children: ReactNode;
}) {
  if (variant === "upwork") {
    return (
      <span className="relative grid h-[3.85rem] w-[3.5rem] shrink-0 place-items-center">
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-[#ff7b8a] to-[#d3124a] shadow-[0_8px_18px_rgba(211,18,74,0.28)]"
          style={{
            clipPath:
              "polygon(50% 0, 96% 24%, 96% 76%, 50% 100%, 4% 76%, 4% 24%)",
          }}
        />
        <span className="relative z-10 grid h-7 w-7 place-items-center text-white">
          {children}
        </span>
      </span>
    );
  }

  return (
    <span className="relative grid h-[3.85rem] w-[3.5rem] shrink-0 place-items-center">
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#f7f7f7] to-[#d8d8d8] shadow-[0_8px_18px_rgba(0,0,0,0.12)]"
        style={{
          clipPath:
            "polygon(14% 0, 86% 0, 100% 16%, 100% 70%, 50% 100%, 0 70%, 0 16%)",
        }}
      />
      <span className="relative z-10 grid h-8 w-8 place-items-center overflow-hidden rounded-md bg-white">
        {children}
      </span>
    </span>
  );
}

export function Footer() {
  const { t } = useLocale();
  const labelOf = (raw: string) => t.nav[raw] ?? raw;
  const services = FEATURED_SERVICE_SLUGS.map((slug) =>
    SERVICES.find((item) => item.slug === slug),
  )
    .filter((item): item is (typeof SERVICES)[number] => Boolean(item))
    .map((item) => locService(t, item));

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-orange" />

      <div className="section-shell relative py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo inverted className="w-[168px]" />
            <p className="mt-5 max-w-[17rem] text-sm leading-relaxed text-white/55">
              {COMPANY.tagline}
            </p>
            <p className="mt-3 text-sm text-white/40">{COMPANY.location}</p>
            <div className="mt-7 flex gap-2">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${COMPANY.name} on ${s.label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-white/65 transition-colors duration-300 hover:border-brand-orange hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>{labelOf("Company")}</FooterHeading>
            <ul className="mt-5 grid gap-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {labelOf(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>{labelOf("Services")}</FooterHeading>
            <ul className="mt-5 grid gap-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-1 text-sm font-medium text-brand-orange"
                >
                  {t.common.exploreMore}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>{t.footer.contact}</FooterHeading>
            <ul className="mt-5 grid gap-3.5 text-sm text-white/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <address className="not-italic leading-relaxed">
                  <span className="block">{COMPANY.street}</span>
                  <span className="block">{COMPANY.city}</span>
                  <span className="block">{COMPANY.country}</span>
                </address>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="break-all">{COMPANY.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-orange" />
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 border-y border-white/10 py-8 sm:grid-cols-3 sm:gap-0">
          {FOOTER_BADGES.map((badge, index) => {
            const mark =
              badge.id === "upwork" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={badge.mark}
                  alt=""
                  className="h-5 w-5 brightness-0 invert"
                />
              ) : (
                <Image
                  src={badge.mark}
                  alt=""
                  width={"markW" in badge ? badge.markW : 64}
                  height={"markH" in badge ? badge.markH : 64}
                  className="h-6 w-6 object-contain"
                />
              );

            const content = (
              <span className="flex items-center gap-3.5">
                <BadgeShield variant={badge.id}>{mark}</BadgeShield>
                <span className="min-w-0 text-left">
                  <span className="block font-sans text-[15px] font-semibold leading-tight text-white">
                    {badge.title}{" "}
                    <span className="text-brand-orange">{badge.year}</span>
                  </span>
                  <span className="mt-0.5 block max-w-[12rem] text-[12px] leading-snug text-white/45 sm:text-[13px]">
                    {badge.body}
                  </span>
                </span>
              </span>
            );

            return (
              <li
                key={badge.id}
                className={`sm:px-6 lg:px-8 ${
                  index > 0 ? "sm:border-l sm:border-white/10" : "sm:pl-0"
                } ${index === FOOTER_BADGES.length - 1 ? "sm:pr-0" : ""}`}
              >
                {badge.href ? (
                  <a
                    href={badge.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-opacity duration-300 hover:opacity-80"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-sm text-white/40 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. {t.common.allRights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {labelOf(link.label)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
