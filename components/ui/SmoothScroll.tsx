"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Global momentum scroll. Runs on `window` (not a custom wrapper), so it
 * still drives real `scrollY` and native `scroll` events — the header's
 * scroll-spy and scroll-state listeners need no changes. Lenis honors
 * `prefers-reduced-motion` itself (smoothing disabled, scrolls become
 * instant), so no manual guard is needed here.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -96 },
      duration: 1.1,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
