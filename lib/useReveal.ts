"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  /** rootMargin passed to the observer */
  margin?: string;
}

/**
 * Reveal-on-scroll primitive.
 *
 * Content stays hidden until it actually enters the viewport. If
 * IntersectionObserver is missing, we show immediately so nothing is trapped.
 * SSR always renders the final markup — the hidden state only exists once JS
 * has hydrated.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  margin = "-12% 0px -8% 0px",
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

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.05 },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [shown, margin]);

  return { ref, shown };
}
