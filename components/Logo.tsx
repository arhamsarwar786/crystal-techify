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
  /** Light artwork for black surfaces (header, footer, contrast bands). */
  inverted?: boolean;
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
  inverted = false,
}: LogoProps) {
  if (variant === "lockup") {
    if (inverted) {
      return (
        <span className={`inline-flex ${className ?? ""}`}>
          <Image
            src="/brand/lockup-dark.png"
            alt="Crystal Techify"
            width={750}
            height={632}
            priority={priority}
            className="h-auto w-full"
          />
        </span>
      );
    }
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

  if (inverted) {
    return (
      <span className={`inline-flex shrink-0 ${className ?? ""}`}>
        <Image
          src="/brand/logo2.svg"
          alt="Crystal Techify"
          width={378}
          height={130}
          priority={priority}
          unoptimized
          className="h-10 w-auto max-w-[176px] sm:h-12 sm:max-w-[220px]"
        />
      </span>
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
        className="h-10 w-auto max-w-[176px] dark:hidden sm:h-12 sm:max-w-[220px]"
      />
      <Image
        src="/brand/logo2.svg"
        alt="Crystal Techify"
        width={378}
        height={130}
        priority={priority}
        unoptimized
        className="hidden h-10 w-auto max-w-[176px] dark:block sm:h-12 sm:max-w-[220px]"
      />
    </span>
  );
}
