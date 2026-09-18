"use client";

import { Quote } from "lucide-react";
import { BandDecor } from "@/components/ui/BandDecor";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

export function TestimonialsGrid() {
  const { t } = useLocale();
  return (
    <section className="band-muted relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24">
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="Testimonials"
          title={t.testimonials.title}
          description={t.testimonials.pageDescription}
        />
        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          {TESTIMONIALS.map((item, i) => (
            <article
              key={`${item.name}-${item.company}`}
              onMouseMove={setSpot}
              className="card-on-muted fx-spot"
            >
              <Quote className="h-5 w-5 text-brand-orange" />
              <p className="mt-3 text-[14px] leading-relaxed text-ink/55 sm:text-[15px]">
                “{t.testimonialsItems[i]?.quote ?? item.quote}”
              </p>
              <footer className="mt-5">
                <p className="font-sans text-sm font-semibold text-ink">
                  {item.name}
                </p>
                <p className="text-xs text-ink/50">
                  {(t.testimonialsItems[i]?.role ?? item.role) === item.company
                    ? item.company
                    : `${t.testimonialsItems[i]?.role ?? item.role} · ${item.company}`}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
