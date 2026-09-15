"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PORTFOLIO_ITEMS } from "@/lib/data";

export function FeaturedCases({ detailHref }: { detailHref?: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const items = PORTFOLIO_ITEMS;
  const current = items[index];

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setIndex((prev) => (prev + dir + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 7000);
    return () => clearInterval(timer);
  }, [paginate]);

  if (!current) return null;

  const highlights = current.tags.slice(0, 3);

  return (
    <section
      id="case-studies"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          eyebrow="Be the next success story"
          detailHref={detailHref}
          detailLabel="Explore more"
          title={
            <>
              Work that moved the{" "}
              <span className="gradient-text">needle</span>
            </>
          }
          description="Case studies from mobility, legal, real estate, transit, and architecture — shipped with small specialist teams."
        />

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-14">
          <div className="glass-strong gradient-border min-h-[16rem] rounded-2xl p-6 sm:min-h-[18rem] sm:rounded-3xl sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-orange">
              {current.client} · {current.category}
            </p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                initial={{ opacity: 0, x: direction * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -32 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">
                  {current.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70 sm:text-base">
                  {current.outcome}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink/45">
                  Highlights
                </p>
                <ul className="mt-3 grid gap-2">
                  {highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-ink/75"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/case-studies/${current.slug}`}
                  className="mt-6 inline-flex text-sm font-medium text-brand-orange hover:text-ink"
                >
                  Read the case study
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous case study"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-ink/5 text-ink/70 hover:text-ink"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-1">
              {items.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  aria-label={`Go to ${item.client}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className="grid h-8 place-items-center px-1"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      i === index ? "w-6 bg-brand-orange" : "w-1.5 bg-ink/20"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next case study"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-ink/5 text-ink/70 hover:text-ink"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
