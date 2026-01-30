import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#4cc9f0',
          orange: '#ff7a18',
          red: '#ff3b30',
        },
        panel: '#0b0f14',
      },
      fontFamily: {
        syncopate: ['var(--font-syncopate)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      backgroundImage: {
        scanlines:
          'repeating-linear-gradient(180deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
        noise:
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 0, rgba(255,255,255,0) 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
