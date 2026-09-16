"use client";

import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

export function TestimonialsGrid() {
  const { t } = useLocale();
  return (
    <section className="band-muted relative pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24">
      <div className="section-shell">
        <SectionHeading
          title={t.testimonials.title}
          description={t.testimonials.pageDescription}
        />
        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          {TESTIMONIALS.map((item, i) => (
            <article
              key={`${item.name}-${item.company}`}
              className="card-on-muted"
            >
              <Quote className="h-5 w-5 text-brand-orange" />
              <p className="mt-3 text-sm leading-relaxed text-ink/80 sm:text-base">
                “{t.testimonialsItems[i]?.quote ?? item.quote}”
              </p>
              <footer className="mt-5">
                <p className="text-sm font-semibold text-ink">{item.name}</p>
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
