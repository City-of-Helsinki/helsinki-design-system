module.exports = ({ env }) => ({
  syntax: require('postcss-scss'),
  plugins: [
    require('@csstools/postcss-sass')(),
    require('postcss-import')(),
    require('postcss-preset-env')({
      stage: 2,
    }),
    require('postcss-inline-svg')(),
    env === 'minify'
      ? require('cssnano')({
          preset: [
            'default',
            {
              calc: false,
              svgo: false,
            },
          ],
        })
      : false,
  ],
});
