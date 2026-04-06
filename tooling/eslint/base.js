const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const checkFile = require('eslint-plugin-check-file');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'check-file': checkFile,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react', '^next', '^expo'],
            ['^@?\\w'],
            ['^@/'],
            ['^\\.'],
            ['^.*\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx,js,jsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'no-console': 'warn',
    },
  },
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.next/',
      '.expo/',
      'coverage/',
      'expo-dist/',
      '.turbo/',
    ],
  },
];
