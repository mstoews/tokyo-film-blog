/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    screens: {
      sm: '550px',
      md: '800px',
      lg: '1200px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        primary: '#FF5733',
        secondary: '#FFFC33',
      },
      spacing: {
        5: '3.5rem',
      },
    },
  },

  darkMode: "class",
  plugins: [require('./node_modules/tw-elements/dist/plugin.cjs')]
}

