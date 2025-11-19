/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
  },
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // (✅ TypeScript를 사용하므로 React 17+의 JSX transform을 위해 필요 없음)
    'react/react-in-jsx-scope': 'off',
    // (✅ props 타입 검사를 TypeScript에 위임)
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    react: {
      version: 'detect', // (package.json의 React 버전을 자동으로 감지)
    },
  },
};