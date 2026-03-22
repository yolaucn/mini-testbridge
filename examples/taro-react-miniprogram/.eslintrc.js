module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  ignorePatterns: [
    'config/**/*',
    '*.config.js',
    'babel.config.js',
    '.eslintrc.js'
  ],
  rules: {
    // 完全禁用引号相关规则
    'quotes': 'off',
    '@typescript-eslint/quotes': 'off',
    'jsx-quotes': 'off',
    'quote-props': 'off',
    // 其他常用规则
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要导入 React
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}