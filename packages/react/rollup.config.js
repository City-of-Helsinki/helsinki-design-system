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
      babelrc: false,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions,
      presets: [
        ['@babel/preset-env', { targets: '>1%, not dead, not ie 11, not op_mini all' }],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
    }),
    terser(),
  ],
  external: [
    /@babel\/runtime/,
    'react',
    'react-dom',
    'lodash.uniqueid',
    'lodash.isequal',
    'react-spring',
    '@react-aria/visually-hidden',
  ],
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
      'components/Button/index': 'src/components/button/index.ts',
      'components/Checkbox/index': 'src/components/checkbox/index.ts',
      'components/Columns/index': 'src/components/columns/index.ts',
      'components/Dropdown/index': 'src/components/dropdown/index.ts',
      'components/ImageWithCard/index': 'src/components/imageWithCard/index.ts',
      'components/Koros/index': 'src/components/koros/index.ts',
      'components/Notification/index': 'src/components/notification/index.ts',
      'components/RadioButton/index': 'src/components/radioButton/index.ts',
      'components/Section/index': 'src/components/section/index.ts',
      'components/StatusLabel/index': 'src/components/statusLabel/index.ts',
      'components/TextInput/index': 'src/components/textInput/index.ts',
      'components/Textarea/index': 'src/components/textarea/index.ts',
      'components/Tooltip/index': 'src/components/tooltip/index.ts',
    },
    output: [
      {
        dir: 'lib',
        format: 'esm',
      },
    ],
    ...commonConfig,
  },
];
