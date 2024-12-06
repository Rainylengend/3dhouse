/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeout: {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.8' },
          '100%': { opacity: '0' },
        }
      },
      animation: {
        fadeout: 'fadeout 1.5s ease-in-out',
      }
    },
  },
  plugins: [],
}

