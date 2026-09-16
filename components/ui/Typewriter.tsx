"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  words: readonly string[];
  className?: string;
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
}

export function Typewriter({
  words,
  className,
  typingMs = 70,
  deletingMs = 36,
  pauseMs = 2600,
}: TypewriterProps) {
  const list = words.length > 0 ? words : [""];
  const signature = list.join("\0");
  const listRef = useRef(list);
  listRef.current = list;

  const [index, setIndex] = useState(0);
  const [text, setText] = useState(list[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = listRef.current;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(current[0] ?? "");
      return;
    }

    const word = current[index % current.length] ?? "";
    if (!deleting && text === word) {
      const pause = window.setTimeout(() => setDeleting(true), pauseMs);
      return () => window.clearTimeout(pause);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % current.length);
      return;
    }

    const delay = deleting ? deletingMs : typingMs;
    const tick = window.setTimeout(() => {
      setText((value) =>
        deleting ? value.slice(0, -1) : word.slice(0, value.length + 1),
      );
    }, delay);
    return () => window.clearTimeout(tick);
  }, [text, deleting, index, signature, typingMs, deletingMs, pauseMs]);

  const longest = list.reduce(
    (current, word) => (word.length > current.length ? word : current),
    "",
  );

  return (
    <span className={`relative inline-grid justify-items-start ${className ?? ""}`}>
      <span
        className="invisible col-start-1 row-start-1 whitespace-nowrap"
        aria-hidden
      >
        {longest}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap">
        {text}
        <span
          className="typewriter-cursor ml-[0.12em] inline-block h-[0.78em] w-[0.09em] translate-y-[0.08em] bg-current"
          aria-hidden
        />
      </span>
    </span>
  );
}
