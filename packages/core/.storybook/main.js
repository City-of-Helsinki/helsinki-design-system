module.exports = {
  framework: '@storybook/html-webpack5',
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-swc',
  ],
  webpackFinal: async (config) => {
    // Add SCSS support (replaces @storybook/preset-scss)
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', { loader: 'sass-loader', options: { api: 'modern' } }],
    });
    return config;
  },
};
