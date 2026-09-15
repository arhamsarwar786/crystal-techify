import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialsGrid() {
  return (
    <section className="band-muted relative pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24">
      <div className="section-shell">
        <SectionHeading
          title="Client feedback"
          description="Notes from the founders and operators we ship with."
        />
        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <article
              key={`${t.name}-${t.company}`}
              className="card-on-muted"
            >
              <Quote className="h-5 w-5 text-brand-orange" />
              <p className="mt-3 text-sm leading-relaxed text-ink/80 sm:text-base">
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
