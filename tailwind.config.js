module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        custom: ['Cutive Mono', 'monospace'],
      },
      height: {
        custom: '80vh',
      },
      textShadow: {
        custom: '1px 1px 3px rgb(0 0 0 / 100%)',
      },
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
}
