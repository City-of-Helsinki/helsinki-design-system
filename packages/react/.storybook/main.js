module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-storysource',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
  ],
  staticDirs: [
    '../src/fonts',
    { from: '../src/components/login/storybookStatic', to: '/static-login' },
    { from: '../src/components/cookieConsentCore/example', to: '/static-cookie-consent' },
  ],
  webpack: async (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        // we need an alias for hds-core to point webpack to the package as we can't use tilde (~) with rollup
        './hds-core': require('path').resolve(__dirname, '../../../node_modules/hds-core'),
      },
      plugins: config.resolve.plugins.filter((plugin) => plugin.constructor.name !== 'ModuleScopePlugin'),
    },
  }),
};
