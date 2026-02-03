import {defineBuildConfig} from 'unbuild';
export default defineBuildConfig({
  declaration: true,
  entries: [
    'src/module',
  ],
  externals: [
    '@fortawesome/free-solid-svg-icons',
    '@antify/ui',
    '#vue-router',
  ],
  failOnWarn: false,
});

