"use client";

import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

export function Testimonials() {
  const { t } = useLocale();
  return (
    <section
      id="testimonials"
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          {TESTIMONIALS.map((item, i) => (
            <article
              key={`${item.name}-${item.company}`}
              className="card-on-muted"
            >
              <Quote className="h-5 w-5 text-brand-orange" />
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
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
