/** @type {import('tailwindcss').Config} */
const sharedConfig = require('@budgetino/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  presets: [sharedConfig, require('nativewind/preset')],
};
