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
      serif: ['Merriweather', 'serif'],
      garamond: ['Garamond', 'sans-serif'],
      primary:['Garamond', 'sans-serif'],
      sans: ['Garamond', 'sans-serif'],
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

