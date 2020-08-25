/* eslint-disable import/no-extraneous-dependencies */
import babel from '@rollup/plugin-babel';
import includePaths from 'rollup-plugin-includepaths';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const commonConfig = {
  plugins: [
    includePaths({ paths: ['src'], extensions }),
    resolve(),
    commonjs({
      include: '../../node_modules/**',
    }),
    terser(),
    postcss({
      modules: true,
      minimize: {
        preset: [
          'default',
          {
            calc: false,
          },
        ],
      },
    }),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
  external: ['react', 'react-dom', 'lodash.uniqueid', 'lodash.isequal', 'react-spring', '@react-aria/visually-hidden'],
};

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/umd/index.js',
        format: 'umd',
        name: 'hds-react',
        globals: {
          react: 'React',
          'lodash.isequal': 'isEqual',
          'lodash.uniqueid': 'uniqueId',
          'react-spring': 'reactSpring',
          '@react-aria/visually-hidden': 'visuallyHidden',
        },
      },
    ],
    ...commonConfig,
  },
  {
    input: {
      index: 'src/index.ts',
      'components/index': 'src/components/index.ts',
      'icons/index': 'src/icons/index.ts',
      'components/button/index': 'src/components/button/index.ts',
      'components/checkbox/index': 'src/components/checkbox/index.ts',
      'components/columns/index': 'src/components/columns/index.ts',
      'components/dropdown/index': 'src/components/dropdown/index.ts',
      'components/image-with-card/index': 'src/components/image-with-card/index.ts',
      'components/koros/index': 'src/components/koros/index.ts',
      'components/notification/index': 'src/components/notification/index.ts',
      'components/radio-button/index': 'src/components/radio-button/index.ts',
      'components/section/index': 'src/components/section/index.ts',
      'components/text-input/index': 'src/components/text-input/index.ts',
      'components/textarea/index': 'src/components/textarea/index.ts',
      'components/tooltip/index': 'src/components/tooltip/index.ts',
    },
    output: [
      {
        dir: 'lib',
        format: 'es',
      },
    ],
    ...commonConfig,
  },
];
