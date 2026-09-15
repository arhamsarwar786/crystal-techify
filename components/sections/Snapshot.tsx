"use client";

import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/lib/useReveal";

const STATS = [
  { value: "500+", label: "Projects delivered", animate: true },
  { value: "500+", label: "Clients served", animate: true },
  { value: "27001", label: "ISO/IEC certified", animate: false },
  { value: "Top 3%", label: "US talent pool", animate: true },
] as const;

export function Snapshot() {
  const { ref, shown } = useReveal<HTMLElement>({ margin: "-40px" });

  return (
    <section
      id="snapshot"
      ref={ref}
      className="band-muted relative scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell">
        <SectionHeading
          title="Firm snapshot"
          description="One office in Dublin, Ohio. One engineering standard for product, AI, and augmentation work."
        />

        <dl className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="card-on-muted">
              <dt className="font-sans text-3xl font-semibold tracking-tight text-ink sm:text-[2rem]">
                {stat.animate ? (
                  <CountUp value={stat.value} start={shown} />
                ) : (
                  stat.value
                )}
              </dt>
              <dd className="mt-2 text-sm text-ink/50">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
