"use client";

import {
  ArrowUpRight,
  CalendarClock,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { BrandBackdrop } from "@/components/ui/BrandBackdrop";
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

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Careers", href: "/careers" },
  { label: "How we work", href: "/process" },
  { label: "Contact Us", href: "/contact" },
] as const;

function FooterHeading({ children }: { children: string }) {
  return (
    <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
      {children}
    </h3>
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
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
        <BrandBackdrop />
      </div>

      <div className="section-shell relative py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo inverted className="w-[168px]" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              {COMPANY.tagline}
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${COMPANY.name} on ${s.label}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/50 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>{labelOf("Company")}</FooterHeading>
            <ul className="mt-4 grid gap-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {labelOf(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>{labelOf("Services")}</FooterHeading>
            <ul className="mt-4 grid gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
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
            <ul className="mt-4 grid gap-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                {COMPANY.address}
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

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 sm:flex-row sm:items-center sm:px-7">
          <div>
            <p className="font-sans text-base font-semibold text-white">
              {t.footer.haveProduct}
            </p>
            <p className="mt-1 text-sm text-white/55">{t.footer.talkFirst}</p>
          </div>
          <CalendlyCTAButton className="w-full shrink-0 sm:w-auto">
            <CalendarClock className="h-4 w-4" />
            {t.common.talkToUs}
          </CalendlyCTAButton>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-sm text-white/50 sm:flex-row sm:text-left">
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-white/70">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-orange" />
              {t.common.iso}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
