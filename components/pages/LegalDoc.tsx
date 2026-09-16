"use client";

import { COMPANY } from "@/lib/data";
import { fmt, useLocale } from "@/lib/i18n";
import { LegalPage, LegalSection } from "@/components/layout/LegalPage";

export function LegalDoc({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useLocale();
  const title = kind === "privacy" ? t.legal.privacyTitle : t.legal.termsTitle;
  const intro = kind === "privacy" ? t.legal.privacyIntro : t.legal.termsIntro;
  const sections = kind === "privacy" ? t.legal.privacy : t.legal.terms;

  return (
    <LegalPage title={title} updated="September 2026" intro={intro}>
      {sections.map((section) => (
        <LegalSection key={section.heading} heading={section.heading}>
          <p>
            {fmt(section.body, { email: COMPANY.email })
              .split(COMPANY.email)
              .map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-brand-orange hover:underline"
                    >
                      {COMPANY.email}
                    </a>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                ),
              )}
          </p>
        </LegalSection>
      ))}
    </LegalPage>
  );
}
