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
  LEGAL_LINKS,
  NAV_GROUPS,
  SOCIAL_LINKS,
} from "@/lib/data";

const SOCIAL_ICONS = {
  LinkedIn: Linkedin,
  X: Twitter,
  GitHub: Github,
} as const;

function FooterColumn({
  title,
  href,
  links,
}: {
  title: string;
  href: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="min-w-0">
      <Link
        href={href}
        className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
      >
        {title}
      </Link>
      <ul className="mt-4 grid gap-y-1">
        {(links.length ? links : [{ label: "Overview", href }]).map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 py-1 text-sm leading-snug text-white/75 transition-colors hover:text-white"
            >
              {link.label}
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-70" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const sitemap = NAV_GROUPS.filter((group) => group.label !== "Contact");

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-orange" />
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <BrandBackdrop />
      </div>

      <div className="section-shell relative py-12 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          <div className="max-w-xl">
            <Logo variant="lockup" inverted className="w-[150px]" />
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              {COMPANY.about}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange" />
              </span>
              Built in {COMPANY.location}
            </p>
          </div>
          <div className="flex shrink-0 gap-2.5">
            {SOCIAL_LINKS.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${COMPANY.name} on ${s.label}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/50 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {sitemap.map((group) => (
            <FooterColumn
              key={group.label}
              title={group.label}
              href={group.href}
              links={group.children}
            />
          ))}

          <div className="min-w-0">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li className="flex items-start gap-2.5 text-sm text-white/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                {COMPANY.location}
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-start gap-2.5 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                  <span className="break-words">{COMPANY.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY.phoneHref}
                  className="flex items-center gap-2.5 text-sm text-white/80 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-orange" />
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 sm:mt-14 sm:flex-row sm:items-center sm:px-8 sm:py-6">
          <div>
            <p className="text-base font-medium text-white sm:text-lg">
              Have a product in mind?
            </p>
            <p className="mt-1 text-sm text-white/60">
              Talk to our experts first — then decide if we are the right fit.
            </p>
          </div>
          <CalendlyCTAButton className="w-full shrink-0 sm:w-auto">
            <CalendarClock className="h-4 w-4" />
            Talk to us
          </CalendlyCTAButton>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-sm text-white/55 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-white/75">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-orange" />
              ISO/IEC 27001:2013
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
