import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  detailHref?: string;
  detailLabel?: string;
  tone?: "default" | "brand";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  detailHref,
  detailLabel = "View details",
  tone = "default",
}: SectionHeadingProps) {
  const onBrand = tone === "brand";
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-display text-[10px] font-normal uppercase tracking-[0.22em] backdrop-blur sm:px-3.5 sm:text-[11px] sm:tracking-[0.26em] ${
            onBrand
              ? "border-black/15 bg-black/10 text-black"
              : "border-ink/10 bg-ink/5 text-ink/60"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
              onBrand ? "bg-black" : "bg-brand-gradient"
            }`}
          />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2
          className={`mt-4 text-[1.45rem] leading-snug sm:mt-5 sm:text-[2.15rem] md:text-[2.55rem] ${
            onBrand ? "text-white" : ""
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={`mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base ${
              onBrand ? "text-black/80" : "text-ink/60"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
      {detailHref && (
        <Reveal delay={0.14}>
          <Link
            href={detailHref}
            className={`mt-5 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              onBrand
                ? "bg-black text-white hover:bg-black/80"
                : "border border-ink/15 bg-ink/5 text-brand-orange hover:border-brand-orange/40 hover:text-ink"
            }`}
          >
            {detailLabel}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      )}
    </div>
  );
}
