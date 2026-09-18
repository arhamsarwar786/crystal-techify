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
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="Testimonials"
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
              <Quote className="h-5 w-5 text-brand-orange" />
              <p className="mt-3 text-[14px] leading-relaxed text-ink/55">
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
