"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/types";
import { setSpot } from "@/lib/spot";

export function CaseCard({
  slug,
  name,
  client,
  category,
  outcome,
  timeline,
  teamSize,
  image,
  index,
}: PortfolioItem & { index?: number }) {
  const n = index !== undefined ? String(index + 1).padStart(2, "0") : null;

  return (
    <Link
      href={`/case-studies/${slug}`}
      onMouseMove={setSpot}
      className="card-on-muted fx-spot group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
    >
      {n ? (
        <span aria-hidden className="index-ghost">
          {n}
        </span>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
          {category}
        </p>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-orange" />
      </div>

      {image ? (
        <div className="mt-5 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="h-40 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      ) : null}

      <h3 className="mt-5 font-sans text-lg font-semibold tracking-tight text-ink sm:text-xl">
        {name}
      </h3>
      <p className="mt-1 text-sm text-ink/50">{client}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/70">{outcome}</p>

      <p className="mt-auto pt-6 font-sans text-[11px] uppercase tracking-[0.14em] text-ink/40">
        {timeline} · {teamSize}
      </p>
    </Link>
  );
}
