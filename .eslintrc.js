export default {
  plugins: ['fsd'],
  extends: ['airbnb-base', 'airbnb-typescript/base', 'plugin:fsd/all'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: { 'object-curly-newline': 'off', 'no-new': 'off', 'no-restricted-globals': 'off' },
};
