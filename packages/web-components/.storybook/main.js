
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

module.exports = {
  stories: [ '../src/**/*.stories.@(js|jsx|ts|tsx)' ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
  ],
  framework: '@storybook/web-components',
  staticDirs: [ '../src/fonts' ],
  webpack,
}
