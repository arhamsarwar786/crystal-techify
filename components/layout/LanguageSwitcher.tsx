"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LOCALES, useLocale, type Locale } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((item) => item.code === locale) ?? LOCALES[0];

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (code: Locale) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={`${t.common.selectLanguage}: ${current.name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 text-white transition-colors hover:border-white/45"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/flags/${current.flag}.png`}
          alt=""
          className="h-5 w-5 rounded-full object-cover"
        />
        <span className="hidden text-[11px] font-semibold tracking-[0.08em] sm:inline">
          {current.short}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/70 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="listbox"
            aria-label={t.common.selectLanguage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 top-full z-50 mt-3 w-60 rounded-[1.15rem] border border-white/10 bg-[#111] p-1.5 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.65)]"
          >
            {LOCALES.map((item) => {
              const active = item.code === locale;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => select(item.code)}
                  className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors ${
                    active
                      ? "bg-white/10 text-brand-orange"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full border border-white/15 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/flags/${item.flag}.png`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">{item.name}</span>
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-white/40">
                    {item.short}
                  </span>
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
