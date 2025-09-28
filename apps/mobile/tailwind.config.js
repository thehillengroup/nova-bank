/** @type {import('tailwindcss').Config} */
const { theme } = require('@repo/design-tokens');

module.exports = {
  content: ['./App.{ts,tsx}', './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: theme.colors,
      fontFamily: {
        sans: [...theme.fonts.sans],
      },
    },
  },
  plugins: [],
};
