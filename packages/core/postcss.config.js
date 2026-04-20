const sass = require('sass');
const path = require('path');
const postcss = require('postcss');

const sassPlugin = {
  postcssPlugin: 'postcss-sass-modern',
  Once(root, { result }) {
    const file = result.opts.from;
    if (!file) return;
    const realFile = file.replace(/#sass$/, '');
    if (!/\.(scss|css)$/.test(realFile)) return;

    const compiled = sass.compile(realFile, {
      loadPaths: [path.dirname(realFile)],
    });

    for (const url of compiled.loadedUrls) {
      if (url.protocol === 'file:') {
        const dep = decodeURIComponent(url.pathname);
        if (dep !== realFile) {
          result.messages.push({ type: 'dependency', plugin: 'postcss-sass-modern', file: dep, parent: realFile });
        }
      }
    }

    const parsed = postcss.parse(compiled.css, { from: realFile });
    root.removeAll();
    root.append(parsed.nodes);
  },
};

module.exports = ({ env }) => ({
  syntax: require('postcss-scss'),
  plugins: [
    sassPlugin,
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
