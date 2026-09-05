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
          DEFAULT: "#090A0F",
          800: "#0D0F16",
          700: "#12151F",
        },
        // Theme-aware semantic tokens (see globals.css for the values).
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        brand: {
          red: "#FF3B30",
          orange: "#FF9500",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #FF3B30 0%, #FF9500 100%)",
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(255,90,40,0.55)",
        "glow-sm": "0 0 20px -6px rgba(255,120,40,0.5)",
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
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 60s linear infinite",
        "glow-pulse": "glow-pulse 6s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "spin-slow": "spin-slow 26s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
