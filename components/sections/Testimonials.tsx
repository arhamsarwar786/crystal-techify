"use client";

import { Quote } from "lucide-react";
import { BandDecor } from "@/components/ui/BandDecor";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";
import { setSpot } from "@/lib/spot";

export function Testimonials({
  band = "muted",
}: {
  band?: "canvas" | "muted";
}) {
  const { t } = useLocale();
  const muted = band === "muted";
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      className={`${muted ? "band-muted" : "band-canvas"} relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24`}
    >
      <BandDecor />
      <div className="section-shell relative">
        <SectionHeading
          kicker="Testimonials"
          title={t.testimonials.title}
          description={t.testimonials.description}
        />
      </div>

      <div className="group/testimonials relative mt-8 sm:mt-10">
        <div className="mask-fade-x overflow-hidden py-1">
          <div className="testimonial-marquee-track flex w-max items-stretch gap-4">
            {loop.map((item, i) => {
              const source = TESTIMONIALS[i % TESTIMONIALS.length];
              const copy = t.testimonialsItems[i % TESTIMONIALS.length];
              const quote = copy?.quote ?? source.quote;
              const role = copy?.role ?? source.role;

              return (
                <article
                  key={`${item.name}-${item.company}-${i}`}
                  onMouseMove={setSpot}
                  className={`${muted ? "card-on-muted" : "card-on-canvas"} fx-spot flex w-[19.5rem] shrink-0 flex-col sm:w-[23rem]`}
                >
                  <Quote className="h-5 w-5 text-brand-orange" />
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink/55">
                    “{quote}”
                  </p>
                  <footer className="mt-5">
                    <p className="font-sans text-sm font-semibold text-ink">
                      {item.name}
                    </p>
                    <p className="text-xs text-ink/50">
                      {role === item.company ? item.company : `${role} · ${item.company}`}
                    </p>
                  </footer>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
