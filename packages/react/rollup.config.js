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
    terser(),
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
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
  external: ['react', 'react-dom', 'lodash.uniqueid', 'lodash.isequal', 'react-spring/renderprops.cjs'],
};

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.js',
        format: 'cjs',
      },
    ],
    external: commonConfig.external,
    // plugins: [...commonConfig.plugins, terser()],
    plugins: [...commonConfig.plugins],
  },
  {
    input: {
      index: 'src/index.ts',
      components: 'src/components/index.ts',
      icons: 'src/icons/index.ts',
      'components/button': 'src/components/button/index.ts',
      'components/checkbox': 'src/components/checkbox/index.ts',
      'components/dropdown': 'src/components/dropdown/index.ts',
      'components/radio-button': 'src/components/radiobutton/index.ts',
      'components/text-input': 'src/components/textinput/index.ts',
      // 'components/button/Button': 'src/components/button/Button.tsx',
      // 'components/textinput/TextInput': 'src/components/textinput/TextInput.tsx',
      // 'components/textinput/TextArea': 'src/components/textinput/TextArea.tsx',
      // 'components/notification/Notification': 'src/components/notification/Notification.tsx',
      // 'components/section/Section': 'src/components/section/Section.tsx',
      // 'components/koros/Koros': 'src/components/koros/Koros.tsx',
      // 'components/imagewithcard/ImageWithCard': 'src/components/imagewithcard/ImageWithCard.tsx',
      // 'components/columns/Columns': 'src/components/columns/Columns.tsx',
      // 'components/tooltip/Tooltip': 'src/components/tooltip/Tooltip.tsx',
      // 'components/radiobutton/RadioButton': 'src/components/radiobutton/RadioButton.tsx',
      // 'components/checkbox/Checkbox': 'src/components/checkbox/Checkbox.tsx',
      // 'components/dropdown/Dropdown': 'src/components/dropdown/Dropdown.tsx',
    },
    output: [
      {
        dir: 'lib-esm',
        format: 'esm',
      },
    ],
    ...commonConfig,
  },
];
