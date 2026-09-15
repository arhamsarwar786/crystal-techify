import { SectionHeading } from "@/components/ui/SectionHeading";
import { PARTNERSHIPS } from "@/lib/data";

export function Partnerships() {
  return (
    <section
      id="recognition"
      className="band-canvas relative py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          title="Partnerships & recognition"
          description="Certifications, delivery, and independent recognition — from a single US base."
        />
        <ul className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERSHIPS.map((item) => (
            <li key={item.title} className="card-on-canvas flex flex-col">
              <item.icon className="h-5 w-5 text-brand-orange" />
              <h3 className="mt-4 font-sans text-base font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink/70">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
