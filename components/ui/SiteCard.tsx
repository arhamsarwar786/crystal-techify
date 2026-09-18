"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/lib/i18n";

export function CardArt({ src }: { src: string }) {
  return (
    <div className="relative h-[10.75rem] overflow-hidden rounded-[1.35rem] bg-[#FFF6F0] dark:bg-white/[0.06] sm:h-[11.5rem]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" loading="eager" />
    </div>
  );
}

export function SiteCard({
  href,
  title,
  description,
  art,
  image,
  className,
}: {
  href: string;
  title: string;
  description: string;
  art?: ReactNode;
  image?: string;
  className?: string;
}) {
  const { t } = useLocale();

  return (
    <Link
      href={href}
      className={`site-card group/card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 ${className ?? ""}`}
    >
      {art ?? (image ? <CardArt src={image} /> : null)}
      <div className="flex min-h-0 flex-1 flex-col px-1.5 pb-1.5 pt-5">
        <h3 className="font-sans text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[14px] leading-relaxed text-ink/55">
          {description}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-brand-orange">
          {t.common.viewDetails}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/card:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
