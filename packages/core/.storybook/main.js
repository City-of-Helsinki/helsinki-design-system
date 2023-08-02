module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.@(js|mdx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-backgrounds',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource'
  ],
  staticDirs: ['../src/fonts'],
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { 
        ...config.module, 
        rules: [
          ...config.module.rules, 
          {
            test: /.svg$/,
            use: ['svg-url-loader'],
          }
      ] },
    };
  },  
};
