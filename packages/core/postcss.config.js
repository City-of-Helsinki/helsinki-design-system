module.exports = ({ env }) => ({
  plugins: [
    require('postcss-import')(),
    require('postcss-preset-env')({ browsers: 'ie >= 11' }),
    require('postcss-inline-svg')(),
    require('autoprefixer')({}),
    env === 'minify'
      ? require('cssnano')({
          preset: [
            'default',
            {
              calc: false,
            },
          ],
        })
      : false,
  ],
});
