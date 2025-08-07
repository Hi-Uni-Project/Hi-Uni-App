const colors = require('./src/styles/colors');
const fontsUtil = require('./src/styles/fonts');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors.system,
        ...colors.background,
      },
    },
  },
  plugins: [fontsUtil],
};
