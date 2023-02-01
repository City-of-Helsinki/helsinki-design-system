const postcss = require('postcss');
const postcssModules = require('postcss-modules');

const processor = postcss(
  postcssModules({
    global: true,
    generateScopedName: '[local]',
    getJSON: () => {},
  }),
);

const webpackFinal = (config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      // we need an alias for hds-core to point webpack to the package as we can't use tilde (~) with rollup
      './hds-core': require('path').resolve(__dirname, '../../../node_modules/hds-core'),
    },
  },
  module: {
    ...config.module,
    rules: [
      ...(config.module.rules ? config.module.rules : []),
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'lit-css-loader',
            options: {
              specifier: 'lit-element',
              transform: (css, { filePath }) => processor.process(css, { from: filePath }).then((res) => res.css),
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
});

const addons = [
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  '@storybook/addon-controls',
  '@storybook/addon-viewport',
  '@storybook/addon-backgrounds',
  '@storybook/addon-a11y',
  '@storybook/addon-actions',
  '@storybook/addon-storysource',
];

const rollupConfig = {
  core: {
    builder: 'webpack5',
  },
  staticDirs: ['../src/fonts'],
  framework: '@storybook/web-components',
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons,
  webpackFinal,
};

module.exports = rollupConfig;
