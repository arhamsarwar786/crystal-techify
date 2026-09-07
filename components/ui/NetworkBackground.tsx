"use client";

import { useEffect, useRef } from "react";

interface NetworkBackgroundProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

function makeSeededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Animated node-and-connection network — the "live circuit" a real AI/data
 * platform actually looks like, rendered on canvas so it stays crisp and
 * cheap at any viewport size. Reacts to the cursor, respects reduced-motion,
 * and pauses off-screen/hidden tabs so it never costs battery for nothing.
 */
export function NetworkBackground({ className }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rand = makeSeededRandom(42);
      const count = Math.min(85, Math.round((width * height) / 11000));
      particles = Array.from({ length: count }, () => ({
        x: rand() * width,
        y: rand() * height,
        vx: (rand() - 0.5) * 0.28,
        vy: (rand() - 0.5) * 0.28,
        r: 1.1 + rand() * 1.5,
      }));
    }

    function colors() {
      const isDark = document.documentElement.classList.contains("dark");
      return {
        line: isDark ? "255,255,255" : "30,32,42",
        node: "255,122,42",
      };
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const { line, node } = colors();
      const maxDist = Math.min(170, width * 0.13);
      const mouseDist = maxDist * 1.6;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx!.strokeStyle = `rgba(${line}, ${(1 - dist / maxDist) * 0.16})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        }

        const dxm = p.x - mouse.x;
        const dym = p.y - mouse.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < mouseDist) {
          ctx!.strokeStyle = `rgba(${node}, ${(1 - dm / mouseDist) * 0.4})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      }

      for (const p of particles) {
        ctx!.beginPath();
        ctx!.fillStyle = `rgba(${node}, 0.55)`;
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    }

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(parent);

    function handleMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function handleLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function handleVisibility() {
      if (document.visibilityState === "visible") {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(raf);
      }
    }

    if (!prefersReducedMotion) {
      parent.addEventListener("mousemove", handleMove);
      parent.addEventListener("mouseleave", handleLeave);
      document.addEventListener("visibilitychange", handleVisibility);
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("mousemove", handleMove);
      parent.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
