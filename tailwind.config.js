/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      sans: ["Open Sans", "sans-serif"],
      colors: {
        blue: {
          DEFAULT: "#1852A4",
          50: "#86B1ED",
          100: "#74A5EB",
          200: "#518EE6",
          300: "#2D77E0",
          400: "#1D64C8",
          500: "#1852A4",
          600: "#113A73",
          700: "#0A2142",
          800: "#030911",
          900: "#000000",
        },
        mercury: "#e7e6e6",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
