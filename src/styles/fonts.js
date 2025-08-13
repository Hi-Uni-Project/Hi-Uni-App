module.exports = function addFontsUtil({ addUtilities }) {
  const typoUtilities = {
    '.typo-title-26-bold': {
      'font-weight': 700,
      'font-size': '26px',
      'line-height': '130%',
      'letter-spacing': '-2.5%',
    },
    '.typo-sub-title-18-medium': {
      'font-weight': 500,
      'font-size': '18px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    '.typo-body-16-bold': {
      'font-weight': 700,
      'font-size': '16px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    '.typo-body-16-regular': {
      'font-weight': 400,
      'font-size': '16px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    '.typo-body-15-regular': {
      'font-weight': 400,
      'font-size': '15px',
      'line-height': '20px',
      'letter-spacing': '-2%',
    },
    '.typo-body-14-semibold': {
      'font-weight': 600,
      'font-size': '14px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    '.typo-body-13-light': {
      'font-weight': 300,
      'font-size': '13px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    '.typo-body-12-light': {
      'font-weight': 300,
      'font-size': '12px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    '.typo-error-14-medium': {
      'font-weight': 600,
      'font-size': '14px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    '.typo-error-14-regular': {
      'font-weight': 400,
      'font-size': '14px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    '.typo-main-button-18-semibold': {
      'font-weight': 600,
      'font-size': '18px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    '.typo-main-button-16-semibold': {
      'font-weight': 600,
      'font-size': '16px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
    // 디자인팀에서 새로 추가되는 폰트
    '.typo-sub-title-18-regular': {
      'font-weight': 400,
      'font-size': '18px',
      'line-height': '24px',
      'letter-spacing': '-2%',
    },
  };
  addUtilities({ ...typoUtilities });
};
