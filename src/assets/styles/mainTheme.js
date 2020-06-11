const fontSizes = {
  xs: '1rem',
  s: '1.3rem',
  m: '1.6rem',
  l: '1.8rem',
  xl: '2rem',
  xxl: '2.4rem',
};

const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1400px)',
  xxl: '(min-width: 1650px)',
  xxxl: '(min-width: 1880px)',
};

export const theme = {
  colors: {
    primary: '#5ba5a3',
    lightPrimary: '#eef7f6',
    secondary: '#2a3838',
    accept: '#48bb78',
    lightAccept: '#c6f6d5',
    discard: '#f56565',
    lightDiscard: '#fed7d7',
    activeLink: '#b2f5ea',
    text: '#141414',
    textInverse: '#ffffff',
    darkGray: '#4a5568',
    gray: '#ccc',
    lightGray: '#edf2f7',
    white: '#ffffff',
    backgorund: '#141414',
  },
  shadows: {
    basic: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    spreaded: '0 7px 10px 5px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);',
    upper: '0 -3px 3px 0 rgba(0, 0, 0, 0.05)',
  },
  fontWeights: {
    light: 500,
    normal: 600,
    bold: 700,
  },
  fontSizes,
  breakpoints,
};
