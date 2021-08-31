module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: { 'object-curly-newline': 'off', 'no-new': 'off', 'no-restricted-globals': 'off' },
};
