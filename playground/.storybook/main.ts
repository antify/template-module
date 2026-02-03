import type { StorybookConfig } from '@storybook-vue/nuxt';

const config: StorybookConfig = {
  "stories": [
    "../../src/**/*.mdx",
    "../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  "addons": [
    '@storybook/addon-links',
    "@storybook/addon-essentials",
    '@storybook/addon-interactions',
    // "@chromatic-com/storybook",
  ],
  "framework": {
    "name": "@storybook-vue/nuxt",
    "options": {}
  },
};
export default config;
