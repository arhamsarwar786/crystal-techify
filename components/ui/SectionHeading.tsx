"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  detailHref?: string;
  detailLabel?: string;
  index?: string;
  tone?: "light" | "dark";
}

export function SectionHeading({
  title,
  description,
  detailHref,
  detailLabel = "Explore more",
  index,
  tone = "light",
}: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <Reveal>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {index ? (
            <p
              className={`font-sans text-[11px] font-semibold uppercase tracking-[0.28em] ${
                dark ? "text-brand-orange" : "text-brand-orange"
              }`}
            >
              {index}
            </p>
          ) : null}
          <h2
            className={`font-sans text-[1.9rem] font-semibold tracking-[-0.03em] sm:text-[2.45rem] ${
              index ? "mt-2" : ""
            } ${dark ? "text-white" : "text-ink"}`}
          >
            {title}
          </h2>
          <span aria-hidden className="heading-accent" />
          {description ? (
            <p
              className={`mt-5 max-w-xl text-[15px] leading-[1.75] ${
                dark ? "text-white/65" : "text-ink/65"
              }`}
            >
              {description}
            </p>
          ) : null}
        </div>
        {detailHref ? (
          <Link
            href={detailHref}
            className={`group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium transition-colors ${
              dark
                ? "text-white/70 hover:text-white"
                : "text-brand-orange hover:text-ink dark:hover:text-white"
            }`}
          >
            {detailLabel}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ) : null}
      </div>
    </Reveal>
  );
}
