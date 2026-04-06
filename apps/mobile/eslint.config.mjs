import config from '@budgetino/eslint-config/react-native';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...config,
  {
    files: ['*.config.js', 'babel.config.js'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
