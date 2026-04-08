/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef3ff',
          100: '#d6e3ff',
          200: '#aec7ff',
          300: '#84aafb',
          400: '#6a93f1',
          500: '#5680e9',
          600: '#486fd2',
          700: '#3c5eb4',
          800: '#334f94',
          900: '#2d4479',
        },
        accent: {
          sky: '#84CEEB',
          cyan: '#5AB9EA',
          lavender: '#C1C8E4',
          violet: '#8860D0',
        }
      },
    },
  },
  plugins: [],
}

