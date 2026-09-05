"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CalendarClock } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { CTAButton } from "@/components/ui/CTAButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { NAV_LINKS } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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

  const closeMenu = () => setOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
          scrolled
            ? "my-2 rounded-2xl border border-ink/10 bg-bg/70 py-2.5 backdrop-blur-xl sm:py-3"
            : "my-2 border border-transparent py-3 sm:my-3 sm:py-4"
        }`}
      >
        <a href="#top" aria-label="Crystal Techify home" className="min-w-0 shrink">
          <Logo priority />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm text-ink/65 transition-colors hover:text-ink hover:text-glow"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <CTAButton href="#contact">
            <CalendarClock className="h-4 w-4" />
            Book Free Consultation
          </CTAButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-ink/10 bg-ink/5 text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mx-4 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl border border-ink/10 bg-bg/95 p-4 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm text-ink/75 transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <CTAButton
                href="#contact"
                className="mt-3 w-full"
                onClick={closeMenu}
              >
                <CalendarClock className="h-4 w-4" />
                Book Free Consultation
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
