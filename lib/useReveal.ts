"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** rootMargin passed to the observer */
  margin?: string;
  /** hard fallback (ms) after which content is shown regardless of the observer */
  fallback?: number;
}

/**
 * Reveal-on-scroll primitive.
 *
 * Unlike a bare `whileInView`, this can never leave content permanently
 * hidden: if IntersectionObserver is unavailable or never fires, a timeout
 * forces the visible state. SSR always renders the final markup — the hidden
 * state only exists once JS has hydrated.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  margin = "-80px",
  fallback = 1400,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;

    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const reveal = () => setShown(true);
    const timer = window.setTimeout(reveal, fallback);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          window.clearTimeout(timer);
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );

    observer.observe(el);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [shown, margin, fallback]);

  return { ref, shown };
}
