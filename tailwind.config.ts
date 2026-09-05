import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
          muted: "var(--surface-muted)",
        },
        card: "var(--card-background)",
        footer: {
          DEFAULT: "var(--footer-background)",
          foreground: "var(--footer-foreground)",
        },
        header: "var(--header-background)",
        foreground: {
          DEFAULT: "var(--foreground)",
          secondary: "var(--foreground-secondary)",
          muted: "var(--foreground-muted)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
          subtle: "var(--border-subtle)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          foreground: "var(--accent-foreground)",
          subtle: "var(--accent-subtle)",
        },
        input: {
          DEFAULT: "var(--input)",
          foreground: "var(--input-foreground)",
          border: "var(--input-border)",
        },
        arc: {
          dark: "#131210",
          charcoal: "#171613",
          graphite: "#1F1D19",
          surface: "#1C1A17",
          muted: "#2A2722",
          border: "rgba(225, 215, 200, 0.09)",
          concrete: "#8E887E",
          sand: "#D5CEBF",
          ivory: "#FBF9F5",
          stone: "#EBE7DF",
          champagne: {
            DEFAULT: "#C9A86A",
            light: "#DFCBB0",
            dark: "#A88656",
            hover: "#D8B77D",
          },
          bronze: {
            DEFAULT: "#A88656",
            light: "#C5A880",
            dark: "#8C6A3C",
            hover: "#B89558",
          },
          sage: {
            DEFAULT: "#7E8D79",
            light: "#A1B09C",
            dark: "#5E6C59",
          },
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", [".light &", '[data-theme="light"] &']);
    }),
  ],
};

export default config;
