module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
  moduleNameMapper: {
    '^@types(.*)$': '<rootDir>/src/plugin/types$1',
    '^@helpers(.*)$': '<rootDir>/src/plugin/helpers$1',
  },
};
