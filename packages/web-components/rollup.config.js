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

const extensions = ['.js', '.ts'];

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
    plugins: [
      includePaths({ paths: ['src'], extensions }),
      resolve(),
      ts(),
      babel({
        babelHelpers: 'runtime',
        exclude: 'node_modules/**',
        extensions,
      }),
      commonjs({ include: ['../../node_modules/**', 'node_modules/**'] }),
      litcss({
        include: ['/**/*.css', '/**/*.scss'],
        transform: (css, { filePath }) => processor.process(css, { from: filePath }).then((res) => res.css),
      }),
    ],
    external: [
      'postcss',
      'lodash.uniqueid',
      'lodash.isequal',
      'lodash.isfunction',
      'lodash.toString',
      '@babel/runtime',
    ],
  },
];
