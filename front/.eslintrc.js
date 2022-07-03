module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'google',
    'next/core-web-vitals',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  'rules': {
    'semi': ['error', 'never'],
    'require-jsdoc': ['off'],
    'spaced-comment': ['off'],
  },
}
