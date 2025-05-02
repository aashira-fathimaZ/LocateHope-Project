/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#3B82F6',
        },
        teal: {
          500: '#0D9488',
        },
        orange: {
          500: '#F97316',
        },
        green: {
          500: '#22C55E',
        },
        yellow: {
          500: '#EAB308',
        },
        red: {
          500: '#EF4444',
        },
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.7s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};