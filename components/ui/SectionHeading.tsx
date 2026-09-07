import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-3 py-1.5 font-display text-[10px] font-normal uppercase tracking-[0.22em] text-ink/60 backdrop-blur sm:px-3.5 sm:text-[11px] sm:tracking-[0.26em]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gradient" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 text-[1.45rem] leading-snug sm:mt-5 sm:text-[2.15rem] md:text-[2.55rem]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-3 text-sm leading-relaxed text-ink/60 sm:mt-4 sm:text-base">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
