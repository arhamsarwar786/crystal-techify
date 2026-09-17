import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fixed dark shade — used for text/icons that always sit on the
        // orange brand gradient, regardless of the active theme.
        obsidian: {
          DEFAULT: "#0A0A0A",
          800: "#111111",
          700: "#1A1A1A",
        },
        // Theme-aware semantic tokens (see globals.css for the values).
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        brand: {
          red: "#DC2626",
          orange: "rgb(var(--brand) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Poppins", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Michroma", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(120deg, #FF6B1A 0%, #FF9A3C 100%)",
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 16px 40px -20px rgba(255,107,26,0.35)",
        "glow-sm": "0 10px 24px -16px rgba(255,107,26,0.3)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "orb-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.35" },
          "33%": { transform: "translate(3%, -6%) scale(1.08)", opacity: "0.6" },
          "66%": { transform: "translate(-4%, 4%) scale(0.96)", opacity: "0.75" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-20%)", opacity: "0" },
          "10%": { opacity: "0.5" },
          "90%": { opacity: "0.5" },
          "100%": { transform: "translateY(120%)", opacity: "0" },
        },
        kenburns: {
          "0%": { transform: "scale(1.04)" },
          "100%": { transform: "scale(1.08)" },
        },
        "scroll-cue": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(7px)", opacity: "0.35" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "glow-pulse": "glow-pulse 6s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "orb-drift": "orb-drift 14s ease-in-out infinite",
        "scan-line": "scan-line 8s ease-in-out infinite",
        kenburns: "kenburns 40s linear infinite alternate",
        "scroll-cue": "scroll-cue 1.8s ease-in-out infinite",
        "line-grow": "line-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
