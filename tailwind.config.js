/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Grounded in the actual uploaded room photography (marble, walnut,
        // gold linens) rather than a generic "luxury" default. See
        // src/config/siteConfig.ts for the reasoning.
        stone: {
          50: "#F8F6F1",
          100: "#F1EDE3", // primary background
          200: "#E7DFCD",
          300: "#D8CCAE", // warm sand
        },
        gold: {
          400: "#D4B677",
          500: "#C9A961", // champagne gold — accent only, not decoration
          600: "#AD8C48",
        },
        taupe: {
          400: "#BDAF9E",
          500: "#A99885", // soft taupe
          600: "#8C7A66",
        },
        walnut: {
          600: "#5A4534",
          700: "#3B2A20", // deep walnut — dark sections
          800: "#2C1F17",
        },
        charcoal: {
          700: "#39383B",
          800: "#2B2B2E", // charcoal marble — dark sections / footer
          900: "#1C1C1E",
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial type scale — large, spacious, restrained (brief §33)
        "display-xl": ["clamp(3.5rem, 9vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.08" }],
        "display-sm": ["clamp(1.5rem, 2.5vw, 2rem)", { lineHeight: "1.15" }],
      },
      letterSpacing: {
        wide2: "0.08em",
        wide3: "0.14em",
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "scroll-cue": {
          "0%, 100%": { opacity: "0.3", transform: "scaleY(0.6)" },
          "50%": { opacity: "1", transform: "scaleY(1)" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(3%, -4%) scale(1.05)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-4%, 3%) scale(1.08)" },
        },
        "loading-bar": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "200% 0" },
          "50%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "scroll-cue": "scroll-cue 2.4s ease-in-out infinite",
        float: "float 14s ease-in-out infinite",
        "float-slow": "float-slow 18s ease-in-out infinite",
        "loading-bar": "loading-bar 1.1s ease-in-out infinite",
        shimmer: "shimmer 7s ease-in-out infinite",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(201, 169, 97, 0.45)",
        "glow-lg": "0 0 64px -12px rgba(201, 169, 97, 0.5)",
        glass: "0 8px 32px -8px rgba(28, 28, 30, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};
