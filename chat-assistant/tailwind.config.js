/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4C9AFF",
        secondary: "#FFABAB",
        "bg-main": "#F9FAFB",
        "bg-secondary": "#FFFFFF",
        "dark-bg-main": "#121212",
        "dark-bg-secondary": "#2D2D2D",
        "text-main": "#1A202C",
        "text-secondary": "#F9FAFB",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
