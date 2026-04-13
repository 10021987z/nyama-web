import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F0",
        foreground: "#3D3D3D",
        orange: {
          DEFAULT: "#F57C20",
          50: "#FFF3E8",
          100: "#FFE4CC",
          200: "#FFC999",
          300: "#FFAD66",
          400: "#F89233",
          500: "#F57C20",
          600: "#D96A15",
          700: "#B5560F",
          800: "#91430B",
          900: "#6D3208",
        },
        forest: {
          DEFAULT: "#1B4332",
          50: "#E8F0EC",
          100: "#C5DAD0",
          200: "#8BB5A1",
          300: "#518F72",
          400: "#2D6A4F",
          500: "#1B4332",
          600: "#163828",
          700: "#112C1F",
          800: "#0C2016",
          900: "#07140E",
        },
        charcoal: "#3D3D3D",
        gold: {
          DEFAULT: "#D4A017",
          50: "#FBF5E4",
          100: "#F5E7BC",
          200: "#EDCF7A",
          300: "#E3B63E",
          400: "#D4A017",
          500: "#B88A12",
          600: "#9A730E",
          700: "#7C5C0B",
          800: "#5E4508",
          900: "#402F05",
        },
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      borderRadius: {
        card: "16px",
        btn: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
