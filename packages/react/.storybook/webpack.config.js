module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });
  config.module.rules.unshift({
    test: /\.stories\.tsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
      },
    ],
    enforce: 'pre',
  });
  // we need an alias for hds-core to point webpack to the package as we can't use tilde (~) with rollup
  config.resolve.alias['./hds-core'] = require('path').resolve(__dirname, '../../../node_modules/hds-core');
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
