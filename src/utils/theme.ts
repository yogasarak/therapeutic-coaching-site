import { Theme } from '@/types'

export const theme: Theme = {
  colors: {
    primary: '#2D5A87',
    secondary: '#8FBC8F',
    accent: '#F4A460',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#2C3E50',
    textMuted: '#6C757D',
    border: '#DEE2E6',
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
  },
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    secondary: "'Merriweather', Georgia, serif",
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1280px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.15)',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
  },
} as const