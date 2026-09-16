import type { MouseEvent } from "react";

/** Tracks the cursor inside a `.fx-spot` card so the CSS glow can follow it. */
export function setSpot(event: MouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}
