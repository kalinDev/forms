/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        bluePurple: {
          500: '#6979F8',
          700: '#4357F3',
        },
      },
    },
  },
  plugins: [],
}
