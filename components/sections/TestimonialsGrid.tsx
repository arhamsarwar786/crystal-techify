import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";

export function TestimonialsGrid() {
  return (
    <section className="relative pb-16 sm:pb-20 lg:pb-24">
      <div className="section-shell">
        <SectionHeading
          eyebrow="All voices"
          title={
            <>
              Every note from{" "}
              <span className="gradient-text">the people we ship with</span>
            </>
          }
        />
        <div className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <article
              key={`${t.name}-${t.company}`}
              className="glass gradient-border rounded-2xl p-5 sm:p-6"
            >
              <Quote className="h-6 w-6 text-brand-orange/50" />
              <p className="mt-3 text-sm leading-relaxed text-ink/80 sm:text-base">
                “{t.quote}”
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-obsidian">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">
                    {t.name}
                  </span>
                  <span className="block text-xs text-ink/55">
                    {t.role === t.company
                      ? t.company
                      : `${t.role} · ${t.company}`}
                  </span>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
