// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/storybook',
  ],
  googleFonts: {
    families: {
      'Hanken Grotesk': [
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900,
      ],
    },
    display: 'swap',
    outputDir: 'assets',
    download: true,
  },
});
