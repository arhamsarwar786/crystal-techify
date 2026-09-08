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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="section-shell pt-3 sm:pt-4">
        <div
          className={`relative flex items-center gap-3 px-2 py-1.5 transition-all duration-300 sm:px-3 sm:py-2 ${
            scrolled || open
              ? "rounded-2xl border border-ink/[0.08] bg-bg/80 shadow-[0_12px_40px_-24px_rgb(var(--ink)/0.55)] backdrop-blur-xl"
              : "rounded-2xl border border-transparent bg-transparent"
          }`}
        >
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
                  className={`relative px-2.5 py-1.5 font-display text-[10px] tracking-[0.08em] transition-colors hover:text-ink lg:px-3 ${
                    isActive ? "text-ink" : "text-ink/50"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-brand-gradient"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-1 xl:flex">
            <AuthStatus />
            <ThemeToggle className="h-9 w-9 rounded-full border-ink/[0.08] bg-transparent" />
            <CTAButton
              onClick={openCalendly}
              className="!px-4 !py-2 text-[10px]"
            >
              <CalendarClock className="h-3.5 w-3.5" />
              Book a Consultation
            </CTAButton>
          </div>

          <div className="relative z-10 ml-auto flex items-center gap-1 xl:hidden">
            <AuthStatus compact />
            <ThemeToggle className="h-9 w-9 rounded-full border-ink/[0.08] bg-transparent" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 bg-ink/5 text-ink transition-colors hover:border-brand-orange/40"
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
            <div className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-[1.75rem] border border-ink/10 bg-bg/90 p-3 shadow-[0_24px_60px_-28px_rgb(var(--ink)/0.45)] backdrop-blur-2xl">
              <div className="flex flex-col gap-1 p-1">
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
                      className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-sm tracking-[0.1em] transition-colors ${
                        isActive
                          ? "bg-brand-gradient text-obsidian"
                          : "text-ink/80 hover:bg-ink/5"
                      }`}
                    >
                      {link.label}
                      <ArrowUpRight
                        className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                          isActive ? "text-obsidian/80" : "text-ink/30"
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
    </motion.header>
  );
}
