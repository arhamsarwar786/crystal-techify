"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { NAV_GROUPS } from "@/lib/data";
import { fmt, useLocale } from "@/lib/i18n";
import type { NavGroup } from "@/lib/types";

function isGroupActive(group: NavGroup, pathname: string): boolean {
  const href = group.href.split("#")[0];
  return pathname === href || pathname.startsWith(`${href}/`);
}

const HEADER_NAV = NAV_GROUPS.filter((group) => group.label !== "Customers");

function DesktopGroup({
  group,
  pathname,
  label,
  childLabel,
}: {
  group: NavGroup;
  pathname: string;
  label: string;
  childLabel: (raw: string) => string;
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
          active ? "text-white" : "text-white/70 hover:text-white"
        }`}
      >
        {label}
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
                  {childLabel(child.label)}
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
  const { t } = useLocale();
  const labelOf = (raw: string) => t.nav[raw] ?? raw;
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);
  const controlClass =
    "border-white/20 bg-white/10 text-white hover:border-brand-orange/50";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/75 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          : "border-b border-transparent bg-black"
      }`}
    >
      <div className="section-shell">
        <div className="relative flex items-center gap-3 py-3 text-white sm:py-3.5">
          <Link
            href="/"
            aria-label={t.common.homeAria}
            className="relative z-10 flex min-w-0 shrink-0 items-center py-0.5"
          >
            <Logo priority inverted />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex">
            {HEADER_NAV.map((group) => (
              <DesktopGroup
                key={group.label}
                group={group}
                pathname={pathname}
                label={labelOf(group.label)}
                childLabel={labelOf}
              />
            ))}
          </nav>

          <div className="relative z-10 ml-auto hidden shrink-0 items-center gap-2 xl:flex">
            <ThemeToggle className={`h-10 w-10 rounded-full ${controlClass}`} />
            <LanguageSwitcher />
          </div>

          <div className="relative z-10 ml-auto flex items-center gap-1 xl:hidden">
            <LanguageSwitcher />
            <ThemeToggle className={`h-11 w-11 rounded-full ${controlClass}`} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.common.closeMenu : t.common.openMenu}
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
            className="border-t border-white/10 bg-black xl:hidden"
          >
            <div className="section-shell max-h-[calc(100dvh-5rem)] overflow-y-auto py-3">
              <div className="flex flex-col gap-1">
                {HEADER_NAV.map((group) => {
                  const active = isGroupActive(group, pathname);
                  const isOpen = expanded === group.label;
                  const label = labelOf(group.label);
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
                          {label}
                        </Link>
                        {group.children.length > 0 && (
                          <button
                            type="button"
                            aria-label={fmt(
                              isOpen ? t.common.hideLinks : t.common.showLinks,
                              { label },
                            )}
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
                            {labelOf(child.label)}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
