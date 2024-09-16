import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],

      },
      fontSize: {
        default: ["14px", { lineHeight: "18px" }],
        xs: ["16px", { lineHeight: "22px" }],
        xl: ["22px", { lineHeight: "32px" }],
      },
      backgroundImage: {
        'news-section': "url('/images/news-section/bg-news-section.svg')",
      },
      boxShadow: {},
      dropShadow: {},
      colors: {
        amethyst: "#7B51A6",
        darkerAmethyst: "#6C399E",
        silver: "#939393",
        pearl: "#F9FAFE",
        coral: "#FF8585",
        onyx: "#000000",
        snow: "#ffffff",
        charcoal: "#202020",
        whisper: "#EAECF5",
      },
      keyframes: {
        pulse: {},
      },
      animation: {},
    },
    screens: {
      mini: "520px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "15px",
        sm: "20px",
        lg: "40px",
        xl: "60px",
      },
    },
  },
  plugins: [],
};
export default config;
