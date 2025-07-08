/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './App.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'pretendard-bold': ['Pretendard-Bold'],
        'pretendard-medium': ['Pretendard-Medium'],
        'pretendard-regular': ['Pretendard-Regular'],
        'pretendard-semibold': ['Pretendard-SemiBold'],
        'pretendard-light': ['Pretendard-Light'],
      },
      fontSize: {
        'title-26': '26px',
        'subtitle-18': '18px',
        'body-16': '16px',
        'body-15': '15px',
        'body-14': '14px',
        'body-13': '13px',
        'body-12': '12px',
        'button-18': '18px',
        'button-16': '16px',
        'error-14': '14px',
      },
      colors: {
        'error-red': '#FB6C6C',
        'gray-title': '#B7B7B7',
        'gray-sub': '#B7B7B7',
        'gray-body': '#979797',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const typoUtilities = {
        '.typo-title-26-bold': {
          'font-family': 'Pretendard-Bold',
          'font-size': '26px',
          'font-weight': '700',
          'line-height': '130%',
        },
        '.typo-subtitle-18-medium': {
          'font-family': 'Pretendard-Medium',
          'font-size': '18px',
          'font-weight': '500',
          'line-height': '24px',
        },
        '.typo-body-16-bold': {
          'font-family': 'Pretendard-Bold',
          'font-size': '16px',
          'font-weight': '700',
          'line-height': '24px',
        },
        '.typo-body-16-regular': {
          'font-family': 'Pretendard-Regular',
          'font-size': '16px',
          'font-weight': '400',
          'line-height': '24px',
        },
        '.typo-body-15-regular': {
          'font-family': 'Pretendard-Regular',
          'font-size': '15px',
          'font-weight': '400',
          'line-height': '20px',
        },
        '.typo-body-14-semibold': {
          'font-family': 'Pretendard-SemiBold',
          'font-size': '14px',
          'font-weight': '600',
          'line-height': '24px',
        },
        '.typo-body-13-light': {
          'font-family': 'Pretendard-Light',
          'font-size': '13px',
          'font-weight': '300',
          'line-height': '24px',
        },
        '.typo-body-12-light': {
          'font-family': 'Pretendard-Light',
          'font-size': '12px',
          'font-weight': '300',
          'line-height': '24px',
        },
        '.typo-error-14-medium': {
          'font-family': 'Pretendard-Medium',
          'font-size': '14px',
          'font-weight': '600',
          'line-height': '24px',
          color: '#F04438',
        },
        '.typo-error-14-regular': {
          'font-family': 'Pretendard-Regular',
          'font-size': '14px',
          'font-weight': '400',
          'line-height': '24px',
          color: '#F04438',
        },
        '.typo-button-18-semibold': {
          'font-family': 'Pretendard-SemiBold',
          'font-size': '18px',
          'font-weight': '600',
          'line-height': '24px',
        },
        '.typo-button-16-semibold': {
          'font-family': 'Pretendard-SemiBold',
          'font-size': '16px',
          'font-weight': '600',
          'line-height': '24px',
        },
      };
      addUtilities(typoUtilities, ['responsive', 'hover']);
    },
  ],
};
