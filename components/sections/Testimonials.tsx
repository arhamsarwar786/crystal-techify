import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="band-muted relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell relative">
        <SectionHeading
          title="Client feedback"
          description="Trusted by founders and operators we ship with."
        />

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <article
              key={`${t.name}-${t.company}`}
              className="card-on-muted"
            >
              <Quote className="h-5 w-5 text-brand-orange" />
              <p className="mt-3 text-sm leading-relaxed text-ink/80">
                “{t.quote}”
              </p>
              <footer className="mt-5">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-ink/50">
                  {t.role === t.company
                    ? t.company
                    : `${t.role} · ${t.company}`}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
