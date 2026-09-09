"use client";

import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  start: boolean;
  className?: string;
}

/**
 * Animates the leading number in a value like "500+" or "ISO 27001:2013"
 * from 0 up to its target once `start` flips true, keeping any prefix/suffix
 * text static. Values with no leading number render unchanged.
 */
export function CountUp({ value, start, className }: CountUpProps) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const [display, setDisplay] = useState(value);
  const played = useRef(false);
  const startedOnMount = useRef(start);

  useEffect(() => {
    const m = value.match(/^(\D*)(\d+)(.*)$/);
    if (!m || !start || played.current) return;
    played.current = true;

    // Already in view on first paint (hero) — keep the real number. Animating
    // from 0 here made stats flash as "0+" for over a second.
    if (startedOnMount.current) {
      setDisplay(value);
      return;
    }

    const [, prefix, digits, suffix] = m;
    const target = parseInt(digits, 10);
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${prefix}${Math.round(v)}${suffix}`),
    });

    return () => controls.stop();
  }, [start, value]);

  return <span className={className}>{match ? display : value}</span>;
}
