"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CalendarClock, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { CTAButton } from "@/components/ui/CTAButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { openCalendly } from "@/lib/calendly";
import { NAV_LINKS } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever nav link's section is currently
  // crossing the vertical center band of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => {
      const id = link.href.includes("#")
        ? link.href.split("#")[1]
        : link.href.replace(/^\//, "");
      return document.getElementById(id);
    }).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="section-shell pt-3 sm:pt-4">
        <div
          className={`relative flex items-center justify-between gap-3 rounded-full px-2 py-1.5 transition-all duration-300 sm:px-2.5 sm:py-2 ${
            scrolled || open
              ? "border border-ink/10 bg-bg/75 shadow-[0_8px_40px_-18px_rgb(var(--ink)/0.28)] backdrop-blur-2xl"
              : "border border-ink/10 bg-bg/40 backdrop-blur-xl"
          }`}
        >
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent transition-opacity duration-300 ${
              scrolled || open ? "opacity-100" : "opacity-40"
            }`}
          />

          <a
            href="/"
            aria-label="Crystal Techify home"
            className="relative z-10 flex min-w-0 shrink items-center rounded-full py-1 pl-2 pr-1"
          >
            <Logo priority />
          </a>

          <nav className="hidden items-center rounded-full bg-ink/[0.035] p-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeHash === `#${link.href.split("#")[1]}`;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-3 py-1.5 font-display text-[11px] tracking-[0.14em] transition-colors hover:text-ink ${
                    isActive
                      ? "text-ink"
                      : "text-ink/55"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-bg shadow-sm ring-1 ring-ink/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="relative z-10 hidden items-center gap-1.5 lg:flex">
            <ThemeToggle className="h-10 w-10 rounded-full" />
            <CTAButton
              onClick={openCalendly}
              className="!px-5 !py-2.5 text-[11px]"
            >
              <CalendarClock className="h-4 w-4" />
              Book a Consultation
            </CTAButton>
          </div>

          <div className="relative z-10 flex items-center gap-1.5 lg:hidden">
            <ThemeToggle className="h-10 w-10 rounded-full" />
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
            className="section-shell mt-2 lg:hidden"
          >
            <div className="max-h-[calc(100dvh-6.5rem)] overflow-y-auto rounded-[1.75rem] border border-ink/10 bg-bg/90 p-3 shadow-[0_24px_60px_-28px_rgb(var(--ink)/0.45)] backdrop-blur-2xl">
              <div className="flex flex-col gap-1 p-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeHash === `#${link.href.split("#")[1]}`;
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
