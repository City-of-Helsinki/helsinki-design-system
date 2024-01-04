/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';

import includePaths from 'rollup-plugin-includepaths';
import resolve from '@rollup/plugin-node-resolve';
import ts from 'rollup-plugin-ts';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import cssText from 'rollup-plugin-css-text';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const esmInput = require('./config/esmInput');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJSON = require('./package.json');

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

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const externals = [...Object.keys(packageJSON.dependencies), ...Object.keys(packageJSON.peerDependencies)];

const getExternal = (format) => (format === 'esm' ? [...externals, /@babel\/runtime/] : externals);

const getConfig = (format, extractCSS) => ({
  plugins: [
    includePaths({ paths: ['src'], extensions }),
    resolve(),
    ts(),
    format === 'esm' &&
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions,
      }),
    commonjs({
      include: ['../../node_modules/**', 'node_modules/**'],
    }),
    json(),
    postcss({
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
      plugins: [postcssImport()],
    }),
    terser(),
    extractCSS ? cssText() : undefined,
    extractCSS ? moveCss() : undefined,
    extractCSS ? insertCssEsm() : undefined,
    extractCSS
      ? del({
          targets: 'lib/tmp',
          hook: 'closeBundle',
        })
      : undefined,
    format === 'cjs' ? insertCssCjs() : undefined,
  ],
  external: getExternal(format),
});

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
