"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CalendarClock, ArrowUpRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { CTAButton } from "@/components/ui/CTAButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { AuthStatus } from "@/components/layout/AuthStatus";
import { openCalendly } from "@/lib/calendly";
import { NAV_GROUPS } from "@/lib/data";
import type { NavGroup } from "@/lib/types";

function isGroupActive(group: NavGroup, pathname: string): boolean {
  if (pathname === group.href || pathname.startsWith(`${group.href}/`)) {
    return true;
  }
  return group.children.some(
    (child) =>
      pathname === child.href.split("#")[0] ||
      pathname.startsWith(`${child.href.split("#")[0]}/`),
  );
}

function DesktopGroup({
  group,
  pathname,
  inverted,
}: {
  group: NavGroup;
  pathname: string;
  inverted?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const active = isGroupActive(group, pathname);
  const hasMenu = group.children.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => hasMenu && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={group.href}
        aria-expanded={hasMenu ? open : undefined}
        aria-haspopup={hasMenu ? "menu" : undefined}
        className={`relative inline-flex items-center gap-0.5 px-2.5 py-1.5 font-sans text-[12px] font-medium tracking-[0.02em] transition-colors lg:px-3 ${
          inverted
            ? active
              ? "text-white hover:text-white"
              : "text-white/70 hover:text-white"
            : `hover:text-ink dark:hover:text-white ${
                active
                  ? "text-ink dark:text-white"
                  : "text-ink/60 dark:text-white/70"
              }`
        }`}
      >
        {group.label}
        {hasMenu && (
          <ChevronDown
            className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
        {active && (
          <span
            aria-hidden
            className="absolute inset-x-3 -bottom-0.5 h-px bg-brand-orange"
          />
        )}
      </Link>
      <AnimatePresence>
        {open && hasMenu && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3"
          >
            <div className="rounded-2xl border border-ink/[0.08] bg-white p-2 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-[#111]">
              {group.children.map((child) => (
                <Link
                  key={child.href + child.label}
                  href={child.href}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-ink/80 transition-colors hover:bg-ink/5 hover:text-ink dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {child.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink/30 dark:text-white/30" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  const closeMenu = () => setOpen(false);
  const inverted = scrolled || open;
  const controlClass = inverted
    ? "border-white/20 bg-white/10 text-white hover:border-brand-orange/50"
    : "border-ink/15 bg-ink/5 text-ink hover:border-brand-orange/50 dark:border-white/20 dark:bg-white/10 dark:text-white";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="section-shell pt-3 sm:pt-4">
        <div
          className={`relative flex items-center gap-3 rounded-full px-2 py-1.5 transition-[background-color,border-color,box-shadow,color] duration-300 sm:px-3 sm:py-2 ${
            inverted
              ? "border border-white/10 bg-black text-white shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)]"
              : "border border-transparent bg-transparent text-ink dark:text-white"
          }`}
        >
          <Link
            href="/"
            aria-label="Crystal Techify home"
            className="relative z-10 flex min-w-0 shrink-0 items-center py-0.5"
          >
            <Logo priority inverted={inverted} />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
            {NAV_GROUPS.map((group) => (
              <DesktopGroup
                key={group.label}
                group={group}
                pathname={pathname}
                inverted={inverted}
              />
            ))}
          </nav>

          <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-1 xl:flex">
            <AuthStatus inverted={inverted} />
            <ThemeToggle
              className={`h-10 w-10 rounded-full ${controlClass}`}
            />
            <CTAButton
              onClick={openCalendly}
              className="!px-4 !py-2 !text-xs"
            >
              <CalendarClock className="h-3.5 w-3.5" />
              Book a Consultation
            </CTAButton>
          </div>

          <div className="relative z-10 ml-auto flex items-center gap-1 xl:hidden">
            <AuthStatus compact inverted={inverted} />
            <ThemeToggle
              className={`h-11 w-11 rounded-full ${controlClass}`}
            />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors ${controlClass}`}
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
            <div className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-[1.75rem] border border-white/10 bg-black p-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]">
              <div className="flex flex-col gap-1">
                {NAV_GROUPS.map((group) => {
                  const active = isGroupActive(group, pathname);
                  const isOpen = expanded === group.label;
                  return (
                    <div key={group.label}>
                      <div className="flex items-center gap-1">
                        <Link
                          href={group.href}
                          onClick={closeMenu}
                          className={`flex min-h-12 flex-1 items-center rounded-2xl px-4 py-3 font-sans text-base font-medium ${
                            active ? "text-brand-orange" : "text-white"
                          }`}
                        >
                          {group.label}
                        </Link>
                        {group.children.length > 0 && (
                          <button
                            type="button"
                            aria-label={`${isOpen ? "Hide" : "Show"} ${group.label} links`}
                            onClick={() =>
                              setExpanded(isOpen ? null : group.label)
                            }
                            className="grid h-11 w-11 place-items-center rounded-full text-white"
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                      {isOpen &&
                        group.children.map((child) => (
                          <Link
                            key={child.href + child.label}
                            href={child.href}
                            onClick={closeMenu}
                            className="ml-3 flex min-h-11 items-center justify-between rounded-xl px-4 py-2 text-sm text-white/70 hover:text-white"
                          >
                            {child.label}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        ))}
                    </div>
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
