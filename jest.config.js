module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
};
