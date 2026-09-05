import type { AnchorHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "solid" | "outline";
}

export function CTAButton({
  children,
  variant = "solid",
  className,
  ...props
}: CTAButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60";

  if (variant === "outline") {
    return (
      <a
        {...props}
        className={`${base} gradient-border border border-ink/15 bg-ink/5 text-ink backdrop-blur hover:bg-ink/10 hover:shadow-glow-sm ${className ?? ""}`}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      {...props}
      className={`${base} overflow-hidden bg-brand-gradient bg-[length:200%_100%] text-obsidian hover:animate-gradient-x hover:shadow-glow ${className ?? ""}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* sheen sweep — always a light highlight, it rides the orange gradient */}
      <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
    </a>
  );
}
