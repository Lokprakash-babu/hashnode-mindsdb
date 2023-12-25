import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "primary-btn-gradient":
          "linear-gradient(180deg, #264966 2.56%, #1B3E59 95.75%)",
      },
      boxShadow: {
        formFooterShadow: "0 -4px 15px rgb(18 51 76 / 6%)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("@tailwindcss/line-clamp")],
};
export default config;
