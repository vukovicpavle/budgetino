const base = require('./base');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...base,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs['recommended-latest'].rules,
    },
  },
  {
    files: ['**/app/_*.tsx'],
    rules: {
      'check-file/filename-naming-convention': 'off',
    },
  },
];
