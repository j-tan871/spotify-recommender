const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      }, 
    },
    colors: {
      darkblue: {
        DEFAULT: '#0E2550'
      }, 
      pink: {
        DEFAULT: '#FFA7A7'
      }, 
      mediumpink: {
        DEFAULT: '#FFD8D8'
      }, 
      lightpink: {
        DEFAULT: '#FFEAEA'
      }, 
      white: colors.white,
    }
  },
  variants: {
    extend: {
      backgroundColor: ['even'],
    },
  },
  plugins: [],
}
