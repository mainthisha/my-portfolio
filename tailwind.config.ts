import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d0c0b",
        char: "#171513",
        coal: "#211e1b",
        gold: { DEFAULT: "#d8be8c", soft: "#b89c6a", deep: "#8a7247" },
        bone: "#f0eadf",
        taupe: "#8c8478",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "sans-serif"],
      },
      letterSpacing: { tightest: "-0.04em" },
    },
  },
  plugins: [],
};
export default config;
