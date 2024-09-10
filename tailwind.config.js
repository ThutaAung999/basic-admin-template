import { colors } from "./src/styles/colors";

/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.primary,
          primary: colors.primary[600],
        },
        secondary: {
          ...colors.secondary,
          primary: colors.secondary[600],
        },
        error: colors.error,
      },
    },
  },
  plugins: [],
};
