/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const typoUtilities = {
        '.typo-title-26-bold': {
          'font-family': 'Pretendard-Bold',
          'font-size': '26px',
          'line-height': '33.8px',
          'letter-spacing': '-0.65px',
          color: '#111111',
        },
        '.typo-subtitle-18-medium': {
          'font-family': 'Pretendard-Medium',
          'font-size': '18px',
          'line-height': '24px',
          'letter-spacing': '-0.36px',
          color: '#1E2128',
        },
        '.typo-body-16-bold':{
          'font-family': 'Pretendard-Bold',
          'font-size': '16px',
          'line-height': '24px',
          'letter-spacing': '-0.32px',
          color: '#1E2128',
        },
        'typo-body-16-regular':{
          'font-family':'Pretendard-Regular',
          'font-size':'16px',
          'line-height':'24px',
          'letter-spacing':'-0.32px',
          color:'#1E2128',
        },
        'typo-body-15-regular': {
          'font-family': 'Pretendard-Regular',
          'font-size': '15px',
          'line-height': '20px',
          'letter-spacing': '-0.3px',
          color: '#1E2128',
        },
        'typo-body-14-semibold': {
          'font-family': 'Pretendard-SemiBold',
          'font-size': '14px',
          'line-height': '24px',
          'letter-spacing': '-0.28px',
          color: '#1E2128',
        },
        'typo-body-13-light':{
          'font-family': 'Pretendard-Light',
          'font-size': '13px',
          'line-height': '24px',
          'letter-spacing': '-0.26px',
          color: '#1E2128',
        },
        'typo-body-12-light':{
          'font-family': 'Pretendard-Light',
          'font-size': '12px',
          'line-height': '24px',
          'letter-spacing': '-0.24px',
          color: '#1E2128',
        },
        'typo-error-14-medium': {
          'font-family': 'Pretendard-Medium',
          'font-size': '14px',
          'line-height': '24px',
          'letter-spacing': '-0.28px',
          color:'#FB6C6C',
        },
        'typo-error-14-regular': {
          'font-family': 'Pretendard-Regular',
          'font-size': '14px',
          'line-height': '24px',
          'letter-spacing': '-0.28px',
          color:'#FB6C6C',
        },
        'typo-button-18-semibold':{
          'font-family': 'Pretendard-SemiBold',
          'font-size': '18px',
          'line-height': '24px',
          'letter-spacing': '-0.36px',
          color: '#1E2128',
        },
        'typo-button-16-semibold':{
          'font-family': 'Pretendard-SemiBold',
          'font-size': '16px',
          'line-height': '24px',
          'letter-spacing': '-0.32px',
          color: '#1E2128',
        },
      };
      addUtilities(typoUtilities);
    },
  ],
};
