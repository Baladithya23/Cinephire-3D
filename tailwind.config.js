/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        cinema: {
          950: '#06080F',
          900: '#0C111F',
          850: '#111827',
          800: '#1E293B',
          700: '#334155',
          gold: '#EAB308',
          accent: '#06B6D4',
          crimson: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Montserrat', 'sans-serif']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(234, 179, 8, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(234, 179, 8, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
