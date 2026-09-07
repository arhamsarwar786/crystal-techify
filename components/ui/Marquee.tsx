import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  speed?: "normal" | "slow";
  reverse?: boolean;
  /** Overrides the default text-chip styling per item (e.g. for icon tiles). */
  itemClassName?: string;
  /**
   * Extra real (non-transform) padding on the masked wrapper, e.g. "pt-14"
   * for items whose hover state pops a tooltip or scale beyond the row —
   * the horizontal fade mask clips anything painted outside its own box, so
   * transform-based overflow needs genuine box-model room to stay visible.
   */
  wrapperClassName?: string;
}

const DEFAULT_ITEM_CLASS =
  "flex items-center gap-2 whitespace-nowrap rounded-lg border border-ink/10 bg-ink/5 px-3 py-1.5 text-[13px] text-ink/70 backdrop-blur transition-colors duration-300 hover:border-brand-orange/40 hover:text-ink sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm";

export function Marquee({
  items,
  speed = "normal",
  reverse = false,
  itemClassName,
  wrapperClassName,
}: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className={`group mask-fade-x w-full overflow-x-hidden ${wrapperClassName ?? ""}`}>
      <div
        className={`flex w-max items-center gap-3 py-3 group-hover:[animation-play-state:paused] sm:gap-4 ${
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        } ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {doubled.map((item, i) => (
          <span key={i} className={itemClassName ?? DEFAULT_ITEM_CLASS}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
