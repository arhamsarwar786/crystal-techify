import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  detailHref?: string;
  detailLabel?: string;
}

export function SectionHeading({
  title,
  description,
  detailHref,
  detailLabel = "Explore more",
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <h2 className="font-display text-2xl font-normal text-brand-orange sm:text-[2rem]">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm font-medium text-ink sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {detailHref ? (
        <Link
          href={detailHref}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-brand-orange hover:text-ink dark:hover:text-white"
        >
          {detailLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
