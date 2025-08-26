/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode support
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#faf7fb',
          100: '#efe8f6',
          200: '#dac9ee',
          500: '#4b2b6f', // deep purple
        },
        gold: {
          500: '#D4AF37',
        },
        ivory: {
          50: '#fffaf0',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Poppins', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: []
  
}
