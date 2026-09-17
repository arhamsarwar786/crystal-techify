/** Ambient orbs and corner ticks used on content bands. */
export function BandDecor({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-16 top-0 h-64 w-64 rounded-full blur-3xl ${
          dark ? "bg-brand-orange/[0.08]" : "bg-brand-orange/[0.045]"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full blur-3xl ${
          dark ? "bg-white/[0.04]" : "bg-ink/[0.03]"
        }`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t sm:left-6 sm:top-6 sm:h-6 sm:w-6 ${
          dark ? "border-white/20" : "border-ink/15"
        }`}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r sm:bottom-6 sm:right-6 sm:h-6 sm:w-6 ${
          dark ? "border-white/12" : "border-ink/10"
        }`}
      />
    </>
  );
}
