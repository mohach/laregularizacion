/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand:   { DEFAULT: '#1d4ed8', light: '#3b82f6', dark: '#1e3a8a' },
        accent:  '#ef4444',
        gold:    '#f59e0b',
        surface: '#ffffff',
        bg:      '#f8fafc',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body:    ['Source Serif 4', 'Georgia', 'serif'],
        mono:    ['DM Mono', 'monospace'],
        arabic:  ['"Noto Kufi Arabic"', '"Noto Naskh Arabic"', 'serif'],
        urdu:    ['"Noto Nastaliq Urdu"', 'serif'],
      },
      typography: {
        DEFAULT: { css: { maxWidth: 'none', color: '#334155', a: { color: '#1d4ed8' } } },
      },
    },
  },
  plugins: [],
};
