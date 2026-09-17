"use client";

import { Quote } from "lucide-react";
import { BandDecor } from "@/components/ui/BandDecor";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

export function Testimonials() {
  const { t } = useLocale();
  return (
    <section
      id="testimonials"
      className="band-muted relative scroll-mt-24 overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          {TESTIMONIALS.map((item, i) => (
            <article
              key={`${item.name}-${item.company}`}
              onMouseMove={setSpot}
              className="card-on-muted fx-spot"
            >
              <span aria-hidden className="index-ghost">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Quote className="h-5 w-5 text-brand-orange" />
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
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
