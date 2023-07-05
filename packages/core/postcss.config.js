module.exports = ({ env }) => ({
  plugins: [
    require('postcss-import')(),
    require('postcss-preset-env')({
      browsers: '> 0.2%, not iOS < 15, not Safari < 14.5, not dead, not op_mini all, not Android >= 0, not and_uc >= 0',
    }),
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
