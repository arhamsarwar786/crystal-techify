"use client";

import { BandDecor } from "@/components/ui/BandDecor";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InViewCard } from "@/components/ui/InViewCard";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { CaseCard } from "@/components/sections/CaseCard";
import { useLocale } from "@/lib/i18n";
import { locCase } from "@/lib/i18n/localize";

export function FeaturedCases({ detailHref }: { detailHref?: string }) {
  const { t } = useLocale();
  const items = PORTFOLIO_ITEMS.map((p) => locCase(t, p));
  const featuredTop = items.slice(0, 2);
  const featuredMid = items.slice(2, 5);
  const featuredBottom = items.slice(5);

  return (
    <section
      id="case-studies"
      className="band-muted relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          index="04"
          title={t.cases.title}
          description={t.cases.description}
          detailHref={detailHref}
          detailLabel={t.common.exploreMore}
        />

        <div className="mt-8 grid gap-4 sm:mt-10">
          <div className="grid gap-4 lg:grid-cols-2">
            {featuredTop.map((project, index) => (
              <InViewCard key={project.slug} delay={index * 0.1}>
                <CaseCard {...project} index={index} />
              </InViewCard>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMid.map((project, index) => (
              <InViewCard key={project.slug} delay={index * 0.08}>
                <CaseCard {...project} index={index + 2} />
              </InViewCard>
            ))}
          </div>
          {featuredBottom.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredBottom.map((project, index) => (
                <InViewCard key={project.slug} delay={index * 0.08}>
                  <CaseCard {...project} index={index + 5} />
                </InViewCard>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
