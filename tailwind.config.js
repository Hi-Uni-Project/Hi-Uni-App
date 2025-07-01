/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['Pretendard-Bold'],
        subtitle: ['Pretendard-Medium'],
        body: ['Pretendard-Bold'],
        'body-regular': ['Pretendard-Regular'],
        'body-semibold': ['Pretendard-SemiBold'],
        'body-light': ['Pretendard-Light'],
        error: ['Pretendard-Medium'],
        'error-regular': ['Pretendard-Regular'],
        button: ['Pretendard-SemiBold'],
        'button-16': ['Pretendard-SemiBold'],
      },
      fontSize: {
        title: '26px',
        subtitle: '18px',
        body: '16px',
        'body-regular-16': '16px',
        'body-regular-15': '15px',
        'body-semibold': '14px',
        'body-light-13': '13px',
        'body-light-12': '12px',
        error: '14px',
        'error-regular': '14px',
        button: '18px',
        'button-16': '16px',
      },
      colors: {
        'text-red': '#F87171',

        primary: '#6568EB',
        secondary: '#1E2128',
        teritary: '#FFF16C',
        bluegray: '#E4E4F4',
        errorred: '#FB6C6C',

        Background: {
          900: '#1c1c1c',
          800: '#3c3c3c',
          700: '#5b5b5b',
          600: '#6e6e6e',
          500: '#979797',
          400: '#b7b7b7',
          300: '#dadada',
          200: '#eaeaea',
          100: '#f3f3f3',
          50: '#f9f9f9',
        },
      },
    },
  },
  plugins: [],
};
