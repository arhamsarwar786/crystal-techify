import { CalendlyCTAButton } from "@/components/ui/CalendlyCTAButton";

export function ExpertCta() {
  return (
    <section
      id="talk"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20"
    >
      <div className="section-shell">
        <div className="band-black overflow-hidden rounded-[1.75rem] px-6 py-10 text-center sm:px-10 sm:py-14">
          <p className="font-display text-[10px] uppercase tracking-[0.22em] text-brand-orange">
            Start a conversation
          </p>
          <h2 className="mt-4 text-2xl text-white sm:text-4xl">
            Don&apos;t hire us right away.
            <br />
            Talk to our experts first.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            Share the product, the constraint, or the idea. Then decide if we
            are the right fit.
          </p>
          <div className="mt-7 flex justify-center">
            <CalendlyCTAButton>Talk to us</CalendlyCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
