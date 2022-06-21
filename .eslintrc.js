module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  plugins: ['detox', 'jest', 'react'],
  env: {
    'detox/detox': true,
    'jest/globals': true,
  },
  rules: {
    'react/prop-types': 'off',
  },
};
