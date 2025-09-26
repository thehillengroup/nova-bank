import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/mock-data/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#09091a',
        card: '#101123',
        cardMuted: '#1a1b2d',
        primary: '#6366f1',
        secondary: '#22d3ee',
        accent: '#ec4899',
        success: '#22c55e',
        warning: '#f59e0b'
      },
      boxShadow: {
        glass: '0 20px 45px -20px rgba(15, 23, 42, 0.8)',
        innerGlow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;

