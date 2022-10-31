module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.ts"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/web-components",
  staticDirs: ['../src/fonts'],
  webpack: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        // we need an alias for hds-core to point webpack to the package as we can't use tilde (~) with rollup
        './hds-core': require('path').resolve(__dirname, '../../../node_modules/hds-core'),
      },
    },
  }),
}
