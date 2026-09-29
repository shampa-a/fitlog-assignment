import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#090a0b",
        panel: "#111315",
        panel2: "#17191b",
        line: "#292c2f",
        acid: "#ccff00",
        muted: "#969a9d",
      },
      fontFamily: {
        display: ["Arial Narrow", "Impact", "sans-serif"],
        sans: ["Inter", "Arial", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 35px rgba(204,255,0,.14)",
      },
    },
  },
  plugins: [],
};
export default config;
