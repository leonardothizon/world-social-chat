// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '3/10': '30%',
        '3/11': '27.272727%',
        '32%': '32%',
        '5/11': '45.454545%'
      }
    },
    maxWidth: {
      '1/4': '25%',
      '1/3': '33.333333%',
      '1/2': '50%',
      '3/4': '75%'
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/line-clamp')]
};
