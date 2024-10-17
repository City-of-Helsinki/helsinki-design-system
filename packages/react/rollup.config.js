/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';

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
import generatePackageJson from 'rollup-plugin-generate-package-json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const esmInput = require('./config/esmInput');
// eslint-disable-next-line @typescript-eslint/no-var-requires , import/order
const packageJSON = require('./package.json');

const buildForHdsJs = !!process.env.hdsJS;
const updateHdsJs = !!process.env.hdsJSUpdate;
const buildStandAloneBundles = !!process.env.standalone;
const reactEsmOutputFormat = 'react-esm';
const reactCommonJsOutputFormat = 'react-cjs';
const hdsJsEsmOutput = 'hds-js-esm';
const hdsJsCommonJsOutput = 'hds-js-cjs';
const hdsStandAloneOutput = 'hds-js-standalone';

const isEsmOutputFormat = (format) => format === hdsJsEsmOutput || format === reactEsmOutputFormat;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hdsJsPackageJSON = require('../hds-js/package.json');

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

const getExternal = (format) => (isEsmOutputFormat(format) ? [...externals, /@babel\/runtime/] : externals);

const checkModule = (forHdsJs) => {
  const forbiddenImportIds = ['react', 'react-dom'];
  const forbiddenFileExtensions = ['.tsx', '.jsx', '.css', '.scss'];
  const allowedExternals = ['tslib'];
  if (!forHdsJs) {
    // https://github.com/Hacker0x01/react-datepicker/issues/1606
    allowedExternals.push('date-fns');
    // not in react/package.json. Used by rollup-plugin-postcss
    // not sure why included.
    allowedExternals.push('style-inject');
  }

  const hasForbiddenImports = (importedIds) => {
    return importedIds.some((id) => {
      return forbiddenImportIds.includes(id);
    });
  };
  const hasForbiddenFiletype = (id) => {
    const extStartIndex = id.lastIndexOf('.');
    if (extStartIndex === -1) {
      return false;
    }
    const filetype = id.substr(extStartIndex).toLowerCase();
    return forbiddenFileExtensions.includes(filetype);
  };

  const isNodeModule = (id) => {
    const folderCheck = 'node_modules/';
    const isInNodeModules = id.includes(folderCheck);
    if (!isInNodeModules) {
      return false;
    }
    const moduleFolder = id.split(folderCheck)[1].split('/')[0];
    if (allowedExternals.includes(moduleFolder)) {
      return false;
    }
    return true;
  };

  return {
    name: 'checkModule',
    moduleParsed(info) {
      if (forHdsJs && hasForbiddenImports(info.importedIds)) {
        this.error(`Forbidden import found! It imports: ${info.importedIds.join(',')}`);
      }
      if (forHdsJs && hasForbiddenFiletype(info.id)) {
        this.error(`Forbidden file type found!`);
      }
      if (isNodeModule(info.id)) {
        const message = `External module ${info.id} added to built code!`;
        forHdsJs ? this.error(message) : this.warn(message);
      }
    },
  };
};

const getConfig = (format, extractCSS) => ({
  plugins: [
    includePaths({ paths: ['src'], extensions }),
    resolve(),
    ts(),
    isEsmOutputFormat(format) &&
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
    format === reactCommonJsOutputFormat ? insertCssCjs() : undefined,
    format === hdsJsEsmOutput &&
      updateHdsJs &&
      generatePackageJson({
        inputFolder: './',
        outputFolder: '../hds-js/',
        baseContents: hdsJsPackageJSON,
      }),
    !buildStandAloneBundles && checkModule(buildForHdsJs || updateHdsJs),
  ],
  external: !buildStandAloneBundles ? getExternal(format) : false,
});

const outputQueue = [];
if (!buildForHdsJs && !updateHdsJs && !buildStandAloneBundles) {
  outputQueue.push({
    input: esmInput,
    output: [
      {
        dir: 'lib',
        format: 'esm',
      },
    ],
    ...getConfig(reactEsmOutputFormat, false),
  });
  outputQueue.push({
    input: esmInput,
    output: [
      {
        dir: 'lib/tmp',
        format: 'esm',
        exports: 'named',
      },
    ],
    ...getConfig(reactEsmOutputFormat, true),
  });
  outputQueue.push({
    input: ['src/index.ts', 'lib/index.css-text.js'],
    output: [
      {
        dir: 'lib/cjs',
        format: 'cjs',
      },
    ],
    ...getConfig(reactCommonJsOutputFormat, false),
  });
} else if (buildStandAloneBundles) {
  outputQueue.push({
    input: { index: '../hds-js/standalone/cookieConsent.ts' },
    output: [
      {
        dir: '../hds-js/lib/standalone/cookieConsent',
        name: 'hds',
        format: 'iife',
      },
    ],
    ...getConfig(hdsStandAloneOutput, false),
  });
} else {
  outputQueue.push({
    input: { index: '../hds-js/index.ts' },
    output: [
      {
        dir: '../hds-js/lib',
        format: 'esm',
      },
    ],
    ...getConfig(hdsJsEsmOutput, false),
  });

  if (!updateHdsJs) {
    outputQueue.push({
      input: ['../hds-js/index.ts'],
      output: [
        {
          dir: '../hds-js/lib/cjs',
          format: 'cjs',
        },
      ],
      ...getConfig(hdsJsCommonJsOutput, false),
    });
  }
}

export default outputQueue;
