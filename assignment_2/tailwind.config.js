/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'border': '#D1D5DB',
        'forest-green': '#2E8B57',
        'sage-green': '#9DC183',
        'mint-50': '#F0F7F4',
        'sage-50': '#F5F9F3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-green': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};