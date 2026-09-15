import { Check } from "lucide-react";
import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";

const POINTS = [
  "Free 90-minute working session",
  "A real engineer on the call — not a sales deck",
  "Leave with a clear read on what to do next",
] as const;

export function ExpertCta() {
  return (
    <section
      id="talk"
      className="band-muted relative scroll-mt-24 py-16 sm:py-20 lg:py-24"
    >
      <div className="section-shell">
        <div className="rounded-2xl bg-white px-6 py-8 dark:bg-white/[0.06] sm:px-10 sm:py-12 lg:px-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-normal text-brand-orange sm:text-[2rem]">
                Talk to our experts first
              </h2>
              <p className="mt-3 text-sm font-medium text-ink sm:text-base">
                Don&apos;t hire us right away. Share the product, the
                constraint, or the idea — then decide if we are the right fit.
              </p>
              <ul className="mt-6 grid gap-2.5">
                {POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-ink/70"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <CalendlyCTAButton className="w-full shrink-0 sm:w-auto">
              Talk to us
            </CalendlyCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
