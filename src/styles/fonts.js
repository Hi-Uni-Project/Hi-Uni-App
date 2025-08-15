module.exports = function addFontsUtil({ addUtilities }) {
  const typoUtilities = {
    '.typo-title-28-bold': {
      fontWeight: 700,
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: -0.7,
    },
    '.typo-title-26-bold': {
      fontWeight: 700,
      fontSize: 26,
      lineHeight: 34,
      letterSpacing: -0.65,
    },
    '.typo-sub-title-18-medium': {
      fontWeight: 500,
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: -0.36,
    },
    '.typo-sub-title-18-regular': {
      fontWeight: 400,
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: -0.36,
    },
    '.typo-body-16-bold': {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.32,
    },
    '.typo-body-16-regular': {
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.32,
    },
    '.typo-body-15-regular': {
      fontWeight: 400,
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: -0.3,
    },
    '.typo-body-14-semibold': {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: -0.28,
    },
    '.typo-body-13-light': {
      fontWeight: 300,
      fontSize: 13,
      lineHeight: 24,
      letterSpacing: -0.26,
    },
    '.typo-body-12-light': {
      fontWeight: 300,
      fontSize: 12,
      lineHeight: 24,
      letterSpacing: -0.24,
    },
    '.typo-error-14-medium': {
      color: '#FB6C6C',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: -0.28,
    },
    '.typo-error-14-regular': {
      color: '#FB6C6C',
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: -0.28,
    },
    '.typo-main-button-18-semibold': {
      fontWeight: 600,
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: -0.36,
    },
    '.typo-main-button-16-semibold': {
      fontWeight: 600,
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: -0.32,
    },
  };
  addUtilities({ ...typoUtilities });
};
