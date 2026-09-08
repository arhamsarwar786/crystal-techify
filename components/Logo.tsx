import Image from "next/image";

type LogoVariant = "wordmark" | "lockup" | "mark";

interface LogoProps {
  className?: string;
  /**
   * `wordmark` — brand mark + horizontal "CRYSTAL / TECHIFY" text (headers).
   * `lockup`  — the full stacked brand lockup image (footer, brand moments).
   * `mark`    — the crystalline "C" mark on its own.
   */
  variant?: LogoVariant;
  /** pixel height for the mark in the `wordmark` / `mark` variants */
  markSize?: number;
  priority?: boolean;
}

/**
 * Theme-aware Crystal Techify logo.
 *
 * The light/dark swap is done with CSS (`dark:` variants) rather than JS so the
 * correct artwork is present on the very first paint — no flash, works during
 * SSR, and stays a server component.
 */
export function Logo({
  className,
  variant = "wordmark",
  markSize = 36,
  priority = false,
}: LogoProps) {
  if (variant === "lockup") {
    return (
      <span className={`inline-flex ${className ?? ""}`}>
        <Image
          src="/brand/lockup-light.png"
          alt="Crystal Techify"
          width={750}
          height={632}
          priority={priority}
          className="h-auto w-full dark:hidden"
        />
        <Image
          src="/brand/lockup-dark.png"
          alt="Crystal Techify"
          width={750}
          height={632}
          priority={priority}
          className="hidden h-auto w-full dark:block"
        />
      </span>
    );
  }

  if (variant === "mark") {
    return (
      <Image
        src="/brand/mark.png"
        alt="Crystal Techify"
        width={512}
        height={530}
        priority={priority}
        style={{ height: markSize, width: "auto" }}
        className={`shrink-0 ${className ?? ""}`}
      />
    );
  }

  return (
    <span className={`inline-flex shrink-0 ${className ?? ""}`}>
      <Image
        src="/brand/logo.svg"
        alt="Crystal Techify"
        width={383}
        height={130}
        priority={priority}
        unoptimized
        className="h-8 w-auto max-w-[140px] dark:hidden sm:h-9 sm:max-w-[164px]"
      />
      <Image
        src="/brand/logo2.svg"
        alt="Crystal Techify"
        width={378}
        height={130}
        priority={priority}
        unoptimized
        className="hidden h-8 w-auto max-w-[140px] dark:block sm:h-9 sm:max-w-[164px]"
      />
    </span>
  );
}
