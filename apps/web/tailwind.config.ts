import sharedConfig from '@budgetino/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  presets: [sharedConfig],
  content: ['./app/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
};

export default config;
