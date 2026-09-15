import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/types";

export function CaseCard({
  slug,
  name,
  client,
  category,
  outcome,
  timeline,
  teamSize,
  image,
}: PortfolioItem) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="card-on-muted group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
          {category}
        </p>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/30 transition-colors group-hover:text-brand-orange" />
      </div>

      <h3 className="mt-4 font-sans text-base font-semibold text-ink sm:text-[17px]">
        {name}
      </h3>
      <p className="mt-1 text-sm text-ink/50">{client}</p>

      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt=""
          className="mt-4 h-36 w-full rounded-xl object-cover"
        />
      ) : null}

      <p className="mt-3 text-sm leading-relaxed text-ink/70">{outcome}</p>

      <p className="mt-auto pt-6 text-xs text-ink/45">
        {timeline} · {teamSize}
      </p>
    </Link>
  );
}
