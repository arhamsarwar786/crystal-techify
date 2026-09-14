"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CalendarClock, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CTAButton } from "@/components/ui/CTAButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { AuthStatus } from "@/components/layout/AuthStatus";
import { openCalendly } from "@/lib/calendly";
import { NAV_LINKS } from "@/lib/data";

const HASH_TO_PATH: Record<string, string> = {
  about: "/about",
  services: "/services",
  industries: "/industries",
  process: "/process",
  "case-studies": "/case-studies",
};

const HOME_SECTION_IDS = [
  "about",
  "services",
  "industries",
  "process",
  "case-studies",
  "testimonials",
];

function navHash(href: string): string | null {
  const i = href.indexOf("#");
  return i >= 0 ? href.slice(i + 1) : null;
}

function isNavActive(
  href: string,
  pathname: string,
  activeHash: string | null,
): boolean {
  if (href === "/careers") {
    return pathname === "/careers" || pathname.startsWith("/careers/");
  }
  const hash = navHash(href);
  if (!hash) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  const detail = HASH_TO_PATH[hash];
  if (detail && (pathname === detail || pathname.startsWith(`${detail}/`))) {
    return true;
  }
  return pathname === "/" && activeHash === hash;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHash(null);
      return;
    }
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current: string | null = null;
      for (const id of HOME_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveHash(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell pt-3 sm:pt-4">
        <div className="relative flex items-center gap-3 rounded-full border border-ink/[0.08] bg-white/75 px-2 py-1.5 text-ink shadow-[0_8px_32px_-16px_rgba(0,0,0,0.28)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-white/55 sm:px-3 sm:py-2 dark:border-white/10 dark:bg-black/55 dark:text-white dark:supports-[backdrop-filter]:bg-black/40">
          <Link
            href="/"
            aria-label="Crystal Techify home"
            className="relative z-10 flex min-w-0 shrink-0 items-center py-0.5"
          >
            <Logo priority />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
            {NAV_LINKS.map((link) => {
              const isActive = isNavActive(link.href, pathname, activeHash);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-2.5 py-1.5 font-sans text-[12px] font-medium tracking-[0.02em] transition-colors hover:text-ink lg:px-3 dark:hover:text-white ${
                    isActive ? "text-ink dark:text-white" : "text-ink/60 dark:text-white/70"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-brand-orange"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-1 xl:flex">
            <AuthStatus />
            <ThemeToggle className="h-10 w-10 rounded-full border-ink/15 bg-ink/5 text-ink hover:border-brand-orange/50 dark:border-white/20 dark:bg-white/10 dark:text-white" />
            <CTAButton
              onClick={openCalendly}
              className="!px-4 !py-2 !text-xs"
            >
              <CalendarClock className="h-3.5 w-3.5" />
              Book a Consultation
            </CTAButton>
          </div>

          <div className="relative z-10 ml-auto flex items-center gap-1 xl:hidden">
            <AuthStatus compact />
            <ThemeToggle className="h-11 w-11 rounded-full border-ink/15 bg-ink/5 text-ink hover:border-brand-orange/50 dark:border-white/20 dark:bg-white/10 dark:text-white" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 bg-ink/5 text-ink transition-colors hover:border-brand-orange/50 dark:border-white/20 dark:bg-white/10 dark:text-white"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="section-shell mt-2 xl:hidden"
          >
            <div className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-[1.75rem] border border-ink/[0.08] bg-white/90 p-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/70">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = isNavActive(link.href, pathname, activeHash);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      aria-current={isActive ? "true" : undefined}
                      className={`group flex min-h-12 items-center justify-between rounded-2xl px-4 py-3.5 font-sans text-base font-medium transition-colors ${
                        isActive
                          ? "bg-brand-orange text-white"
                          : "text-ink hover:bg-ink/5 dark:text-white dark:hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          isActive ? "text-white/80" : "text-ink/40 dark:text-white/50"
                        }`}
                      />
                    </motion.a>
                  );
                })}
              </div>
              <CTAButton
                className="mt-2 w-full"
                onClick={() => {
                  closeMenu();
                  openCalendly();
                }}
              >
                <CalendarClock className="h-4 w-4" />
                Book a Consultation
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
