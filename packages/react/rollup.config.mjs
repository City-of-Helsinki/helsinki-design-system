/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import includePaths from 'rollup-plugin-includepaths';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import generatePackageJson from 'rollup-plugin-generate-package-json';
// import typescript from '@rollup/plugin-typescript';

import cssText from './rollup-plugin-cssText.mjs';
import packageJSON from './package.json' with { type: 'json' };
import hdsJsPackageJSON from '../hds-js/package.json' with { type: 'json' };
import json from '@rollup/plugin-json';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const externals = [...Object.keys(packageJSON.dependencies), ...Object.keys(packageJSON.peerDependencies), 'react', 'react-dom', 'style-inject', 'date-fns'];
const bundleAsOne = true; // if true, bundle as one index.js file

const insertHdsStyles = () => {
  return {
    name: 'insert-css-esm',
    closeBundle: () => {
      fs.appendFileSync(
        `${__dirname}/lib/index.js`,
        `import CSS_TEXT from './index.css-text'; export { CSS_TEXT as hdsStyles };`,
      );
    },
  };
};

const buildForHdsJs = !!process.env.hdsJS;
const buildStandAloneBundles = !!process.env.standalone;
const updateHdsJs = !!process.env.hdsJSUpdate;

const checkModule = (forHdsJs) => {
  const forbiddenImportIds = ['react', 'react-dom'];
  const forbiddenFileExtensions = ['.tsx', '.jsx', '.css', '.scss'];
  const allowedExternals = ['tslib'];
  // the following externals needed to be allowed because
  // import { setContext } from '@apollo/client/link/context';
  // is not properly detected to be part of the @apollo/client package.
  // The same happens if
  // import { <any import> } from '@apollo/client/core';
  // is used. The only proper way seems to be
  // import { <any import> } from '@apollo/client';
  // Otherwise whole Apollo client in bundled in to hds-js.
  allowedExternals.push('@apollo');
  allowedExternals.push('zen-observable-ts');
  allowedExternals.push('symbol-observable');
  allowedExternals.push('optimism');
  allowedExternals.push('ts-invariant');
  allowedExternals.push('@wry');
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

const getConfig = (buildName) => ({
  plugins: [
    includePaths({ paths: ['src'], extensions }),
    resolve({
      excludeDir: ['stories', 'src/stories'],
    }),
    typescript(
      buildName === 'hds-js-standalone' ? {
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
          },
        },
      } : {}
    ),
    json(),
    postcss({
      modules: true,
      autoModules: true,
      extract: false, // should be used if SSR is used
      use: [
        [
          'sass',
          {
            includePaths: ['./node_modules', '../../node_modules'],
          },
        ],
      ],
      // inject: false,
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
      sourceMap: false,
      // extensions: ['.css', '.scss'],
      plugins: [postcssImport()],
    }),
    terser({
      compress: {
        passes: 2,
      },
    }),
    // FOR SSR
    // cssText({
    //   includeComments: 'in-file-only',
    //   tsDeclaration: true,
    //   constName: 'CSS_TEXT',
    // }),
    // insertHdsStyles(),
    buildName === 'hds-js-esm' && updateHdsJs && generatePackageJson({
      inputFolder: './',
      outputFolder: '../hds-js/',
      baseContents: hdsJsPackageJSON,
    }),
    !buildStandAloneBundles && checkModule(buildForHdsJs || updateHdsJs),
  ],
  external: externals,
})

// the enabled property is used to enable/disable the config
export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'lib',
      format: 'es',
      preserveModulesRoot: bundleAsOne ? undefined : 'src',
      preserveModules: !bundleAsOne,
      exports: 'named',
    },
    ...getConfig('es'),
    enabled: (!buildStandAloneBundles && !buildForHdsJs && !updateHdsJs),
  },
  {
    input: '../hds-js/standalone/cookieConsent.ts',
    output: {
      dir: '../hds-js/lib/standalone/cookieConsent',
      name: 'hds',
      format: 'iife',
    },
    ...getConfig('hds-js-standalone'),
    enabled: buildStandAloneBundles,
  },
  {
    input: '../hds-js/index.ts',
    output: {
      dir: '../hds-js/lib',
      format: 'es',
      preserveModulesRoot: bundleAsOne ? undefined : 'src',
      preserveModules: !bundleAsOne,
      exports: 'named',
    },
    ...getConfig('hds-js-esm'),
    enabled: buildForHdsJs || updateHdsJs,
  }
].filter((config) => config.enabled === true)
  .map(({enabled, ...config}) => config);
