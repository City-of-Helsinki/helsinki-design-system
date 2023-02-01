import fs from 'fs';
import includePaths from 'rollup-plugin-includepaths';
import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-ts';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import litcss from 'rollup-plugin-lit-css';
import postcss from 'postcss';
import postcssModules from 'postcss-modules';

const processor = postcss(
  postcssModules({
    global: true,
    generateScopedName: '[local]',
    getJSON: () => {},
  }),
);

const insertCssCjs = () => {
  return {
    name: 'insert-css-cjs',
    closeBundle: () => {
      fs.appendFileSync(
        `${__dirname}/lib/cjs/index.js`,
        `var hdsStyles = require("./index.css-text"); exports.hdsStyles = hdsStyles;`,
      );
    },
  };
};

const extensions = ['.js', '.ts'];
const external = ['postcss', 'lodash.uniqueid', 'lodash.isequal', 'lodash.isfunction', 'lodash.toString'];

const getExternal = (format) => (format === 'esm' ? [...external, /@babel\/runtime/] : external);

const getPlugins = (format) => {
  const babelPlugin =
    format === 'esm' &&
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions,
    });

  const plugins = [
    includePaths({ paths: ['src'], extensions }),
    resolve(),
    ts(),
    babelPlugin,
    commonjs({ include: ['../../node_modules/**', 'node_modules/**'] }),
    litcss({
      include: ['/**/*.css', '/**/*.scss'],
      transform: (css, { filePath }) => processor.process(css, { from: filePath }).then((res) => res.css),
    }),
  ];

  if (format === 'cjs') {
    plugins.push(insertCssCjs());
  }

  return plugins;
};

const getConfig = (format, extractCSS) => ({
  plugins: getPlugins(format, extractCSS),
  external: getExternal(format),
});

export default [
  {
    input: {
      index: 'src/index.ts',
      'components/index': 'src/components/index.ts',
      'icons/index': 'src/icons/index.ts',
      'components/Accordion/index': 'src/components/accordion/index.ts',
    },
    output: [
      {
        dir: 'lib',
        format: 'esm',
        exports: 'named',
      },
    ],
    ...getConfig('esm'),
  },
  {
    input: ['src/index.ts'],
    output: [
      {
        dir: 'lib/cjs',
        format: 'cjs',
      },
    ],
    ...getConfig('cjs', false),
  },
];
