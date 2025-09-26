/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{ts,tsx}', './app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#05050f',
        card: '#101123',
        cardMuted: '#1a1b2d',
        primary: '#6366f1',
        secondary: '#22d3ee',
        accent: '#ec4899',
        success: '#22c55e',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter_600SemiBold', 'Inter_400Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

