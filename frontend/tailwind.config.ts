import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#dce8ff',
          200: '#b9d2ff',
          300: '#85b0ff',
          400: '#4d85ff',
          500: '#2563eb',
          600: '#1a4fd8',
          700: '#1a3faf',
          800: '#1e358e',
          900: '#1e2f6f',
        },
        glass: {
          light: 'rgba(255,255,255,0.08)',
          medium: 'rgba(255,255,255,0.12)',
          border: 'rgba(255,255,255,0.15)',
        },
        surface: {
          1: '#0f1117',
          2: '#161922',
          3: '#1c2030',
          4: '#242840',
        },
        accent: {
          amber: '#f59e0b',
          green: '#10b981',
          red:   '#ef4444',
          blue:  '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-out',
        'slide-up':   'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        'wave':       'wave 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:   { from: { transform: 'translateY(20px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        slideDown: { from: { transform: 'translateY(-10px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: '1' }, '100%': { transform: 'scale(1.8)', opacity: '0' } },
        wave:      { '0%,100%': { transform: 'scaleY(1)' }, '50%': { transform: 'scaleY(2)' } },
      },
      screens: {
        xs: '375px',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}

export default config
