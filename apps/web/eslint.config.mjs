import config from '@budgetino/eslint-config/nextjs';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...config,
  {
    ignores: ['next-env.d.ts'],
  },
];
