import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  speed?: "normal" | "slow";
  reverse?: boolean;
}

export function Marquee({ items, speed = "normal", reverse = false }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div className="mask-fade-x w-full overflow-hidden">
      <div
        className={`flex w-max items-center gap-3 sm:gap-4 ${
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee"
        } ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2 whitespace-nowrap rounded-lg border border-ink/10 bg-ink/5 px-3 py-1.5 text-[13px] text-ink/70 backdrop-blur sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
