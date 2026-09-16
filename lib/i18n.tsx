"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { enUS } from "./i18n/en-US";
import { deepMerge } from "./i18n/merge";
import { OVERLAYS } from "./i18n/overlays";
import type { Messages } from "./i18n/types";

export const LOCALES = [
  { code: "en-US", name: "English (US)", short: "EN", flag: "us" },
  { code: "en-GB", name: "English (UK)", short: "EN", flag: "gb" },
  { code: "de", name: "Deutsch", short: "DE", flag: "de" },
  { code: "es", name: "Español", short: "ES", flag: "es" },
  { code: "fr", name: "Français", short: "FR", flag: "fr" },
  { code: "id", name: "Bahasa", short: "ID", flag: "id" },
  { code: "th", name: "ไทย", short: "TH", flag: "th" },
  { code: "ar", name: "العربية", short: "AR", flag: "sa" },
  { code: "zh", name: "中文", short: "ZH", flag: "cn" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

const STORAGE_KEY = "ct-locale";

function isLocale(value: string | null): value is Locale {
  return LOCALES.some((item) => item.code === value);
}

export function messagesFor(locale: Locale): Messages {
  if (locale === "en-US") return enUS;
  return deepMerge(enUS, OVERLAYS[locale]);
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en-US");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) setLocaleState(saved);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale === "en-GB" || locale === "en-US" ? "en" : locale;
    html.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t: messagesFor(locale) }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export type { Messages } from "./i18n/types";
export { fmt } from "./i18n/merge";
