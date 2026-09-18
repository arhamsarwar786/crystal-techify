"use client";

import { ArrowRight } from "lucide-react";
import { BandDecor } from "@/components/ui/BandDecor";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { useLocale } from "@/lib/i18n";

function accentLastWord(title: string): [string, string] | [string] {
  const at = title.lastIndexOf(" ");
  if (at < 0) return [title];
  return [title.slice(0, at), title.slice(at + 1)];
}

export function ExpertCta({
  band = "canvas",
}: {
  band?: "canvas" | "muted";
}) {
  const { t } = useLocale();
  const titleParts = accentLastWord(t.expert.title);
  const muted = band === "muted";

  return (
    <section
      id="talk"
      aria-labelledby="talk-heading"
      className={`${muted ? "band-muted" : "band-canvas"} relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24`}
    >
      <BandDecor />

      <div className="section-shell relative">
        <Reveal>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <p className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-orange">
                  <span aria-hidden className="h-px w-6 bg-brand-orange" />
                  {t.common.talkToUs}
                </p>
                <span className={`rounded-full px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/55 dark:bg-white/[0.08] dark:text-white/55 ${
                  muted ? "bg-white" : "bg-[#F7F6F4]"
                }`}>
                  {t.engagement.auditKicker}
                </span>
              </div>
              <h2
                id="talk-heading"
                className="mt-4 font-sans text-[1.9rem] font-semibold tracking-[-0.03em] text-ink sm:text-[2.75rem] sm:leading-[1.08]"
              >
                {titleParts.length === 2 ? (
                  <>
                    {titleParts[0]}{" "}
                    <span className="text-brand-orange">{titleParts[1]}</span>
                  </>
                ) : (
                  titleParts[0]
                )}
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-ink/60">
                {t.expert.body}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CalendlyCTAButton>
                {t.common.talkToUs}
                <ArrowRight className="h-4 w-4" />
              </CalendlyCTAButton>
              <CTAButton href="/contact" variant="outline">
                {t.common.getInTouch}
              </CTAButton>
            </div>
          </div>

          <div className="relative mt-12 sm:mt-14">
            <div
              aria-hidden
              className="absolute left-[16%] right-[16%] top-5 hidden h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent lg:block"
            />
            <ol className="grid gap-4 sm:grid-cols-3">
              {t.expert.points.map((point, index) => (
                <li
                  key={point}
                  className={`relative rounded-[1.5rem] px-6 py-6 sm:px-7 sm:py-7 dark:bg-white/[0.06] ${
                    muted ? "bg-white" : "bg-[#F7F6F4]"
                  }`}
                >
                  <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white font-sans text-sm font-semibold tabular-nums text-brand-orange ring-1 ring-ink/[0.06] dark:bg-[#1a1a1a] dark:ring-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
                    {point}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
