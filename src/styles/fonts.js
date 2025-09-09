module.exports = function addFontsUtil({ addUtilities }) {
  const typoUtilities = {
    // title
    '.typo-title-28-bold': {
      fontWeight: 700,
      fontSize: 28,
      lineHeight: '36.4px',
      letterSpacing: -0.7,
    },
    '.typo-title-26-bold': {
      fontWeight: 700,
      fontSize: 26,
      lineHeight: '33.8px',
      letterSpacing: -0.65,
    },

    // sub title
    '.typo-sub-title-22-bold': {
      fontWeight: 700,
      fontSize: 22,
      lineHeight: '24px',
      letterSpacing: -0.55,
    },
    '.typo-sub-title-22-semibold': {
      fontWeight: 600,
      fontSize: 22,
      lineHeight: '24px',
      letterSpacing: -0.55,
    },
    '.typo-sub-title-20-semibold': {
      fontWeight: 600,
      fontSize: 20,
      lineHeight: '24px',
      letterSpacing: -0.5,
    },
    '.typo-sub-title-20-medium': {
      fontWeight: 500,
      fontSize: 20,
      lineHeight: '24px',
      letterSpacing: -0.5,
    },
    '.typo-sub-title-18-medium': {
      fontWeight: 500,
      fontSize: 18,
      lineHeight: '24px',
      letterSpacing: -0.36,
    },

    // body
    '.typo-body-17-semibold': {
      fontWeight: 600,
      fontSize: 17,
      lineHeight: '24px',
      letterSpacing: -0.34,
    },
    '.typo-body-17-medium': {
      fontWeight: 500,
      fontSize: 17,
      lineHeight: '24px',
      letterSpacing: -0.34,
    },
    '.typo-body-16-bold': {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: -0.32,
    },
    '.typo-body-16-semibold': {
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: -0.32,
    },
    '.typo-body-16-medium': {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: -0.32,
    },
    '.typo-body-16-regular': {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: -0.32,
    },
    '.typo-body-15-semibold': {
      fontWeight: 600,
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.3,
    },
    '.typo-body-15-medium': {
      fontWeight: 500,
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.3,
    },
    '.typo-body-15-regular': {
      fontWeight: 400,
      fontSize: 15,
      lineHeight: '20px',
      letterSpacing: -0.3,
    },

    // caption
    '.typo-caption-14-semibold': {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: '24px',
      letterSpacing: -0.28,
    },
    '.typo-caption-14-regular': {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: -0.28,
    },
    '.typo-caption-14-light': {
      fontWeight: 300,
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: -0.28,
    },

    '.typo-caption-13-medium': {
      fontWeight: 500,
      fontSize: 13,
      lineHeight: '24px',
      letterSpacing: -0.26,
    },
    '.typo-caption-13-light': {
      fontWeight: 300,
      fontSize: 13,
      lineHeight: '24px',
      letterSpacing: -0.26,
    },

    '.typo-caption-12-light': {
      fontWeight: 300,
      fontSize: 12,
      lineHeight: '24px',
      letterSpacing: -0.24,
    },

    '.typo-caption-11-medium': {
      fontWeight: 500,
      fontSize: 11,
      lineHeight: '24px',
      letterSpacing: -0.22,
    },

    // error
    '.typo-error-14-medium': {
      color: '#FB6C6C',
      fontWeight: 500,
      fontSize: 14,
      lineHeight: '24px',
      letterSpacing: -0.28,
    },

    // main button
    '.typo-main-button-18-semibold': {
      fontWeight: 600,
      fontSize: 18,
      lineHeight: '24px',
      letterSpacing: 0,
    },

    // sub button
    '.typo-sub-button-16-semibold': {
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '24px',
      letterSpacing: 0,
    },
  };
  addUtilities({ ...typoUtilities });
};
