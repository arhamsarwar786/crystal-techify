"use client";

import { SiteCard } from "@/components/ui/SiteCard";
import type { PortfolioItem } from "@/lib/types";

export function CaseCard({
  slug,
  name,
  client,
  category,
  outcome,
  image,
}: PortfolioItem) {
  return (
    <SiteCard
      href={`/case-studies/${slug}`}
      title={name}
      description={`${client} — ${outcome}`}
      art={
        image ? (
          <div className="relative h-[14.5rem] overflow-hidden rounded-[1.35rem] bg-[#FFF6F0] dark:bg-white/[0.06] sm:h-[16.5rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
            />
            <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
              {category}
            </span>
          </div>
        ) : undefined
      }
      className={image ? undefined : "min-h-[14rem]"}
    />
  );
}
