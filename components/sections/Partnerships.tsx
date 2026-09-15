import { ShieldCheck } from "lucide-react";
import { PARTNERSHIPS } from "@/lib/data";

export function Partnerships() {
  return (
    <section id="recognition" className="relative py-12 sm:py-16">
      <div className="section-shell">
        <p className="text-center font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
          Partnerships & recognition
        </p>
        <p className="mt-2 text-center text-sm text-ink/60">
          Commitment to excellence
        </p>
        <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          {PARTNERSHIPS.map((item) => (
            <li
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm text-ink/75"
            >
              <ShieldCheck className="h-4 w-4 text-brand-orange" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
