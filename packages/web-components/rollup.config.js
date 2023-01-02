import fs from 'fs';
import includePaths from 'rollup-plugin-includepaths';
import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-ts';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import cssText from 'rollup-plugin-css-text';

const insertCssEsm = () => {
  return {
    name: 'insert-css-esm',
    buildEnd: () => {
      fs.appendFileSync(
        `${__dirname}/lib/index.js`,
        `import CSS_TEXT from './index.css-text'; export { CSS_TEXT as hdsStyles };`,
      );
    },
  };
};

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

const moveCss = () => {
  return {
    name: 'move-css',
    closeBundle: () => {
      fs.renameSync(`${__dirname}/lib/tmp/index.css`, `${__dirname}/lib/index.css`);
      fs.renameSync(`${__dirname}/lib/tmp/index.css-text.d.ts`, `${__dirname}/lib/index.css-text.d.ts`);
      fs.renameSync(`${__dirname}/lib/tmp/index.css-text.js`, `${__dirname}/lib/index.css-text.js`);
    },
  };
};

const extensions = ['.js', '.ts'];
const external = [
  'crc-32',
  'kashe',
  'memoize-one',
  'postcss',
  'lodash.uniqueid',
  'lodash.isequal',
  'lodash.isfunction',
  '@juggle/resize-observer',
  '@popperjs/core',
];

const getExternal = (format) => (format === 'esm' ? [...external, /@babel\/runtime/] : external);

const getPlugins = (format, extractCSS) => {
  const babelPlugin =
    format === 'esm' &&
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions,
    });

  const postCssPlugin = postcss({
    extract: extractCSS ? 'index.css' : undefined,
    modules: true,
    use: ['sass'],
    minimize: {
      preset: [
        'default',
        {
          calc: false,
          discardUnused: true,
          mergeIdents: true,
          reduceIdents: true,
        },
      ],
    },
  });

  const plugins = [
    includePaths({ paths: ['src'], extensions }),
    resolve(),
    ts(),
    babelPlugin,
    commonjs({ include: ['../../node_modules/**', 'node_modules/**'] }),
    json(),
    postCssPlugin,
    terser(),
  ];

  if (extractCSS) {
    plugins.push(
      cssText(),
      moveCss(),
      insertCssEsm(),
      del({
        targets: 'lib/tmp',
        hook: 'closeBundle',
      }),
    );
  }

  if (format === 'cjs') plugins.push(insertCssCjs());
  return plugins;
};

const getConfig = (format, extractCSS) => ({
  plugins: getPlugins(format, extractCSS),
  external: getExternal(format),
});

const esmInput = {
  index: 'src/index.ts',
  'components/index': 'src/components/index.ts',
  'icons/index': 'src/icons/index.ts',
  'components/Accordion/index': 'src/components/accordion/index.ts',
};

export default [
  {
    input: esmInput,
    output: [
      {
        dir: 'lib',
        format: 'esm',
      },
    ],
    ...getConfig('esm', false),
  },
  {
    input: esmInput,
    output: [
      {
        dir: 'lib/tmp',
        format: 'esm',
        exports: 'named',
      },
    ],
    ...getConfig('esm', true),
  },
  {
    input: ['src/index.ts', 'lib/index.css-text.js'],
    output: [
      {
        dir: 'lib/cjs',
        format: 'cjs',
      },
    ],
    ...getConfig('cjs', false),
  },
];
