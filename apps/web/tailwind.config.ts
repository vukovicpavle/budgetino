import type { Config } from 'tailwindcss';
import sharedConfig from '@budgetino/tailwind-config';

const config: Config = {
  darkMode: 'class',
  presets: [sharedConfig],
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};

export default config;
