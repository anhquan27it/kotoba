import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: "#fdf2f4",
          100: "#fce7ea",
          200: "#f9d0d7",
          300: "#f4a8b6",
          400: "#ec7289",
          500: "#df4563",
          600: "#c92b4b",
          700: "#a81f3c",
          800: "#8c1d37",
          900: "#781d33",
        },
        sumi: {
          50: "#f6f6f7",
          100: "#e2e3e7",
          200: "#c5c7cf",
          300: "#a0a3b0",
          400: "#7a7d8c",
          500: "#5f6271",
          600: "#4b4d5a",
          700: "#3f414b",
          800: "#35363f",
          900: "#26272e",
        },
      },
      fontFamily: {
        jp: ["'Hiragino Kaku Gothic ProN'", "'Yu Gothic'", "'Noto Sans JP'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
