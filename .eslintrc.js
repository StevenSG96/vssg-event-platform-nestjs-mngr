module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',

    'no-unused-vars': 'warn',
    'eqeqeq': ['error', 'always'],
    'no-console': 'warn',
    'no-debugger': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'no-var': 'error',
    'prefer-const': 'error',
    'curly': ['error', 'all'],
    'no-undef': 'error',
    'max-lines': ['warn', {
      max: 300,
      skipBlankLines: true,
      skipComments: true,
    }],
    'max-depth': ['warn', 4],

    'keyword-spacing': ['error', { before: true, after: true }],
    'space-infix-ops': ['error'],
    'space-unary-ops': ['error', { words: true, nonwords: false }],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    '@typescript-eslint/type-annotation-spacing': ['error', { before: false, after: true }],
  },
};
