
const webpack = async (config) => ({
  ...config,
  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      // we need an alias for hds-core to point webpack to the package as we can't use tilde (~) with rollup
      './hds-core': require('path').resolve(__dirname, '../../../node_modules/hds-core'),
    },
  },
})

const addons = [
  '@storybook/addon-postcss',
  '@storybook/addon-links',
  '@storybook/addon-essentials',
  '@storybook/addon-controls',
  '@storybook/addon-viewport',
  '@storybook/addon-backgrounds',
  '@storybook/addon-a11y',
  '@storybook/addon-actions',
  '@storybook/addon-storysource',
]

const rollupConfig = {
  core: {
    builder: 'webpack5',
  },
  staticDirs: [ '../src/fonts' ],
  framework: '@storybook/web-components',
  stories: [ '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
  addons,
  webpack,
}

module.exports = rollupConfig;
