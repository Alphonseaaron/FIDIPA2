/** @type {import('tailwindcss').Config} */
export default {
  content: ['./new_static_site/**/*.html', './new_static_site/js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#10b981',
        dark: {
          DEFAULT: '#1a1a1a',
          lighter: '#2d2d2d',
          accent: '#3d3d3d'
        },
        light: {
          DEFAULT: '#ffffff',
          darker: '#f3f4f6',
          accent: '#e5e7eb'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};