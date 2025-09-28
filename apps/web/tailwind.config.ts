import { theme } from '@repo/design-tokens';

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/mock-data/src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: theme.colors,
      boxShadow: theme.shadows,
      fontFamily: {
        sans: [...theme.fonts.sans]
      }
    }
  },
  plugins: []
};

export default config;

