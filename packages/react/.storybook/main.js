module.exports = {
  core: {
    builder: 'webpack5',
  },
  // Disable react-docgen-typescript which uses removed TS4 APIs (createIdentifier etc.)
  // incompatible with TypeScript 5. Will be resolved when upgrading to Storybook 8.
  typescript: {
    reactDocgen: 'react-docgen',
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
    { from: '../src/components/login/storybookStatic', to: '/static-login' },
    { from: '../src/components/cookieConsentCore/example', to: '/static-cookie-consent' },
    { from: '../src/components/cookieConsentCore/siteSettingsEditor', to: '/static-cookie-consent-editor' },
  ],
  webpack: async (config) => ({
    ...config,
    // TypeScript 5 erases type-only re-exports, causing webpack "export was not found"
    // warnings. Storybook 6 treats any warning as an error, so we suppress these.
    ignoreWarnings: [...(config.ignoreWarnings || []), { message: /export .* was not found in/ }],
    // Disable ESLintWebpackPlugin to avoid conflicts between project .eslintrc and
    // react-app preset's eslint config.
    plugins: (config.plugins || []).filter((plugin) => plugin.constructor.name !== 'ESLintWebpackPlugin'),
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
