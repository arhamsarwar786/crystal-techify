import { Github, Linkedin, Mail, MapPin, Phone, ShieldCheck, Twitter } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  COMPANY,
  LEGAL_LINKS,
  NAV_LINKS,
  SERVICES,
  SOCIAL_LINKS,
} from "@/lib/data";

const SOCIAL_ICONS = {
  LinkedIn: Linkedin,
  X: Twitter,
  GitHub: Github,
} as const;

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-ink/10 bg-bg/60 sm:mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-gradient opacity-60" />
      <div className="section-shell py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo variant="lockup" className="w-[150px]" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/55">
              {COMPANY.tagline}
            </p>
            <p className="mt-3 text-sm text-ink/45">
              Built in {COMPANY.location.replace(", USA", "")}. Shipping
              worldwide.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${COMPANY.name} on ${s.label}`}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-ink/10 bg-ink/5 text-ink/60 transition-colors hover:border-brand-orange/40 hover:text-ink"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink/60 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <a
                    href="#services"
                    className="text-sm leading-snug text-ink/55 transition-colors hover:text-ink"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink/60">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <span>
                  {COMPANY.location}
                  <br />& Global Delivery Centers
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-brand-orange" />
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-brand-orange" />
                <a
                  href={COMPANY.phoneHref}
                  className="transition-colors hover:text-ink"
                >
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 text-center text-xs text-ink/40 sm:mt-14 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-ink/70"
              >
                {link.label}
              </Link>
            ))}
            <span className="inline-flex items-center gap-1.5 text-ink/40">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-orange" />
              ISO/IEC 27001:2013
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
