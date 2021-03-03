/* eslint-disable import/no-extraneous-dependencies */
import includePaths from 'rollup-plugin-includepaths';
import resolve from '@rollup/plugin-node-resolve';
import ts from '@wessberg/rollup-plugin-ts';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = [
  'react',
  'react-dom',
  'lodash.uniqueid',
  'lodash.isequal',
  'react-spring',
  'react-use-measure',
  'react-merge-refs',
  'react-virtual',
  'react-popper',
  '@juggle/resize-observer',
  '@popperjs/core',
  '@react-aria/visually-hidden',
];

const getExternal = (format) => (format === 'esm' ? [...external, /@babel\/runtime/] : external);

const getConfig = (format) => ({
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
      include: '../../node_modules/**',
    }),
    postcss({
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
    }),
    terser(),
  ],
  external: getExternal(format),
});

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'lib/cjs',
        format: 'cjs',
      },
    ],
    ...getConfig('cjs'),
  },
  {
    input: {
      index: 'src/index.ts',
      'components/index': 'src/components/index.ts',
      'icons/index': 'src/icons/index.ts',
      'components/Accordion/index': 'src/components/accordion/index.ts',
      'components/Button/index': 'src/components/button/index.ts',
      'components/Card/index': 'src/components/card/index.ts',
      'components/Checkbox/index': 'src/components/checkbox/index.ts',
      'components/Columns/index': 'src/components/columns/index.ts',
      'components/Combobox/index': 'src/components/dropdown/combobox/index.ts',
      'components/Container/index': 'src/components/container/index.ts',
      'components/DateInput/index': 'src/components/dateInput/index.ts',
      'components/Dropdown/index': 'src/components/dropdown/dropdown/index.ts',
      'components/ErrorSummary/index': 'src/components/errorSummary/index.ts',
      'components/Footer/index': 'src/components/footer/index.ts',
      'components/ImageWithCard/index': 'src/components/imageWithCard/index.ts',
      'components/Koros/index': 'src/components/koros/index.ts',
      'components/LoadingSpinner/index': 'src/components/loadingSpinner/index.ts',
      'components/Logo/index': 'src/components/logo/index.ts',
      'components/Navigation/index': 'src/components/navigation/index.ts',
      'components/Notification/index': 'src/components/notification/index.ts',
      'components/RadioButton/index': 'src/components/radioButton/index.ts',
      'components/SearchInput/index': 'src/components/searchInput/index.ts',
      'components/Section/index': 'src/components/section/index.ts',
      'components/Select/index': 'src/components/dropdown/select/index.ts',
      'components/SelectionGroup/index': 'src/components/selectionGroup/index.ts',
      'components/StatusLabel/index': 'src/components/statusLabel/index.ts',
      'components/Tabs/index': 'src/components/tabs/index.ts',
      'components/Tag/index': 'src/components/tag/index.ts',
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
    ...getConfig('esm'),
  },
];
