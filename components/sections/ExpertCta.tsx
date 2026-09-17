"use client";

import { Check } from "lucide-react";
import { BandDecor } from "@/components/ui/BandDecor";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/lib/i18n";

export function ExpertCta({ index }: { index?: string }) {
  const { t } = useLocale();

  return (
    <section
      id="talk"
      className="relative scroll-mt-24 overflow-hidden bg-[#0a0a0a] py-24 sm:py-28 lg:py-32"
    >
      <BandDecor tone="dark" />

      <div className="section-shell relative">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              {index ? (
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-orange">
                  {index}
                </p>
              ) : null}
              <h2
                className={`font-sans text-[1.85rem] font-semibold tracking-tight text-white sm:text-[2.35rem] ${
                  index ? "mt-3" : ""
                }`}
              >
                {t.expert.title}
              </h2>
              <span aria-hidden className="heading-accent" />
              <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
                {t.expert.body}
              </p>
              <ul className="mt-7 grid gap-3">
                {t.expert.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-white/70"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <CalendlyCTAButton className="w-full shrink-0 sm:w-auto">
              {t.common.talkToUs}
            </CalendlyCTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
