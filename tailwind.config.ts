import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        dark: "var(--color-dark)",
        card: "var(--color-card)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        rajdhani: ["var(--font-rajdhani)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
