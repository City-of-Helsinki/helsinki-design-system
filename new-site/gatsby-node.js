const webpack = require('webpack');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      // We need to provide a polyfill for react-live library to make it work with the latest Gatsby: https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
  });
};
