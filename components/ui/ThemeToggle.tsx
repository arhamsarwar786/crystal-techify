"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`group grid h-10 w-10 place-items-center rounded-xl border border-ink/10 bg-ink/5 text-ink/70 transition-colors hover:border-brand-orange/40 hover:text-ink ${
        className ?? ""
      }`}
    >
      {/* Render nothing theme-specific until mounted to avoid hydration mismatch */}
      {mounted ? (
        <motion.span
          key={theme}
          initial={{ rotate: -35, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="grid place-items-center"
        >
          {isDark ? (
            <Moon className="h-[18px] w-[18px]" />
          ) : (
            <Sun className="h-[18px] w-[18px]" />
          )}
        </motion.span>
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
