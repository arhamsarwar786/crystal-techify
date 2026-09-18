"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  kicker?: string;
  title: ReactNode;
  description?: ReactNode;
  detailHref?: string;
  detailLabel?: string;
  tone?: "light" | "dark";
  titleClassName?: string;
}

export function SectionHeading({
  kicker,
  title,
  description,
  detailHref,
  detailLabel = "Explore more",
  tone = "light",
  titleClassName,
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <Reveal>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          {kicker ? (
            <p
              className={`inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] ${
                dark ? "text-brand-orange" : "text-brand-orange"
              }`}
            >
              <span aria-hidden className="h-px w-6 bg-brand-orange" />
              {kicker}
            </p>
          ) : null}
          <h2
            className={`font-sans text-[1.9rem] font-semibold tracking-[-0.03em] sm:text-[2.35rem] sm:leading-[1.12] ${
              kicker ? "mt-3" : ""
            } ${dark ? "text-white" : "text-ink"} ${titleClassName ?? ""}`}
          >
            {title}
          </h2>
          {description ? (
            <p
              className={`mt-4 max-w-md text-[15px] leading-[1.75] ${
                dark ? "text-white/65" : "text-ink/60"
              }`}
            >
              {description}
            </p>
          ) : null}
        </div>
        {detailHref ? (
          <Link
            href={detailHref}
            className={`inline-flex shrink-0 items-center gap-2 self-start rounded-full border px-4 py-2.5 text-sm font-medium transition-colors sm:self-auto ${
              dark
                ? "border-white/35 text-white hover:border-brand-orange hover:bg-brand-orange hover:text-white"
                : "border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
            }`}
          >
            {detailLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </Reveal>
  );
}
