export default defineNuxtConfig({
  ssr: false,

  defaultTemplate: {
    tailwindCSSPath: './assets/css/tailwind.css',
  },

  imports: {
    autoImport: false
  },

  modules: [
    '../src/module',
    '@nuxtjs/storybook',
  ],

  storybook: {
    url: 'http://localhost:6006',
    storybookRoute: '/__storybook__',
    port: 6006,
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-09-06'
});
