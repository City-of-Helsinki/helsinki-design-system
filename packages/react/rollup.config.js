/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';

import includePaths from 'rollup-plugin-includepaths';
import resolve from '@rollup/plugin-node-resolve';
import ts from '@wessberg/rollup-plugin-ts';
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

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = [
  'crc-32',
  'kashe',
  'memoize-one',
  'postcss',
  'react',
  'react-dom',
  'lodash.uniqueid',
  'lodash.isequal',
  'lodash.isfunction',
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

const esmInput = {
  index: 'src/index.ts',
  'components/index': 'src/components/index.ts',
  'icons/index': 'src/icons/index.ts',
  'ssr/index': 'src/ssr/index.ts',
  'components/Accordion/index': 'src/components/accordion/index.ts',
  'components/Button/index': 'src/components/button/index.ts',
  'components/Card/index': 'src/components/card/index.ts',
  'components/Checkbox/index': 'src/components/checkbox/index.ts',
  'components/Columns/index': 'src/components/columns/index.ts',
  'components/CookieConsent/index': 'src/components/cookieConsent/index.ts',
  'components/Combobox/index': 'src/components/dropdown/combobox/index.ts',
  'components/Container/index': 'src/components/container/index.ts',
  'components/DateInput/index': 'src/components/dateInput/index.ts',
  'components/Dialog/index': 'src/components/dialog/index.ts',
  'components/ErrorSummary/index': 'src/components/errorSummary/index.ts',
  'components/Fieldset/index': 'src/components/fieldset/index.ts',
  'components/FileInput/index': 'src/components/fileInput/index.ts',
  'components/Footer/index': 'src/components/footer/index.ts',
  'components/Highlight/index': 'src/components/highlight/index.ts',
  'components/ImageWithCard/index': 'src/components/imageWithCard/index.ts',
  'components/Koros/index': 'src/components/koros/index.ts',
  'components/Link/index': 'src/components/link/index.ts',
  'components/Linkbbox/index': 'src/components/linkbox/index.ts',
  'components/LoadingSpinner/index': 'src/components/loadingSpinner/index.ts',
  'components/Logo/index': 'src/components/logo/index.ts',
  'components/Navigation/index': 'src/components/navigation/index.ts',
  'components/Notification/index': 'src/components/notification/index.ts',
  'components/NumberInput/index': 'src/components/numberInput/index.ts',
  'components/Pagination/index': 'src/components/pagination/index.ts',
  'components/PasswordInput/index': 'src/components/passwordInput/index.ts',
  'components/PhoneInput/index': 'src/components/phoneInput/index.ts',
  'components/RadioButton/index': 'src/components/radioButton/index.ts',
  'components/SearchInput/index': 'src/components/searchInput/index.ts',
  'components/Section/index': 'src/components/section/index.ts',
  'components/Select/index': 'src/components/dropdown/select/index.ts',
  'components/SelectionGroup/index': 'src/components/selectionGroup/index.ts',
  'components/SideNavigation/index': 'src/components/sideNavigation/index.ts',
  'components/StatusLabel/index': 'src/components/statusLabel/index.ts',
  'components/Stepper/index': 'src/components/stepper/index.ts',
  'components/Table/index': 'src/components/table/index.ts',
  'components/Tabs/index': 'src/components/tabs/index.ts',
  'components/Tag/index': 'src/components/tag/index.ts',
  'components/TextInput/index': 'src/components/textInput/index.ts',
  'components/Textarea/index': 'src/components/textarea/index.ts',
  'components/TimeInput/index': 'src/components/timeInput/index.ts',
  'components/ToggleButton/index': 'src/components/toggleButton/index.ts',
  'components/Tooltip/index': 'src/components/tooltip/index.ts',
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
