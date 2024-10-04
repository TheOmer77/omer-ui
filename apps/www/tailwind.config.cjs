import { createPreset } from 'fumadocs-ui/tailwind-plugin';

const baseConfig = require('../../tailwind.config.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  presets: [createPreset()],
  content: [
    ...baseConfig.content,
    'content/**/*.mdx',
    'registry/**/*.{ts,tsx}',
    './node_modules/fumadocs-ui/dist/**/*.js',
  ],
};
