import {
  defineBuildConfig,
} from 'unbuild';
export default defineBuildConfig({
  declaration: true,
  entries: [
    'src/module',
  ],
  externals: [
    '@fortawesome/free-solid-svg-icons',
    '@antify/ui',
    '@nuxtjs/google-fonts',
    '#vue-router',
  ],
  failOnWarn: false,
});
