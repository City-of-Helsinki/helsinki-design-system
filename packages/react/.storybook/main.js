const webpack = require('webpack');

module.exports = {
  framework: '@storybook/react-webpack5',
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-swc',
  ],
  staticDirs: [
    { from: '../src/components/login/storybookStatic', to: '/static-login' },
    { from: '../src/components/cookieConsentCore/example', to: '/static-cookie-consent' },
    { from: '../src/components/cookieConsentCore/siteSettingsEditor', to: '/static-cookie-consent-editor' },
  ],
  webpackFinal: async (config) => {
    // Expose FONT_URL env var to the browser bundle
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.FONT_URL': JSON.stringify(process.env.FONT_URL || ''),
      }),
    );

    // Add SCSS support for non-module .scss files
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /\.module\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });

    // Add SCSS Modules support for .module.scss files
    config.module.rules.push({
      test: /\.module\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
          },
        },
        'sass-loader',
      ],
    });

    // Enable CSS Modules for .module.css files in the existing CSS rule
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString() === '/\\.css$/',
    );
    if (cssRule) {
      // Exclude .module.css from the default CSS rule
      cssRule.exclude = /\.module\.css$/;
    }
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]_[local]__[hash:base64:5]',
            },
          },
        },
      ],
    });

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          // we need an alias for hds-core to point webpack to the package as we can't use tilde (~) with rollup
          './hds-core': require('path').dirname(require.resolve('hds-core/package.json')),
        },
      },
    };
  },
};
