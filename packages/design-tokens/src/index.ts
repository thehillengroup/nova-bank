export const colors = {
  background: '#05050f',
  card: '#101123',
  cardMuted: '#1a1b2d',
  primary: '#6366f1',
  secondary: '#22d3ee',
  accent: '#ec4899',
  success: '#22c55e',
  warning: '#f59e0b',
} as const;

export const shadows = {
  glass: '0 20px 45px -20px rgba(15, 23, 42, 0.8)',
  innerGlow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
} as const;

export const fonts = {
  sans: ['Inter', 'system-ui', 'sans-serif'] as const,
  heading: {
    xl: 'text-5xl',
    lg: 'text-3xl',
    md: 'text-2xl',
    sm: 'text-lg',
    xs: 'text-sm',
  } as const,
  body: {
    lg: 'text-base',
    md: 'text-sm',
    sm: 'text-xs',
  } as const,
} as const;

export const spacing = {
  0: '0px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

export const gradients = {
  pageBackground: ['#0b0b1d', '#05050f'] as const,
  card: ['rgba(99,102,241,0.25)', 'rgba(15,23,42,0.85)'] as const,
} as const;

export const theme = {
  colors,
  shadows,
  fonts,
  spacing,
  gradients,
} as const;

export type Theme = typeof theme;
