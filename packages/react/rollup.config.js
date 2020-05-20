import babel from '@rollup/plugin-babel';
import includePaths from 'rollup-plugin-includepaths';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.js',
      format: 'cjs',
    },
    {
      file: 'lib-esm/index.js',
      format: 'es',
    },
  ],
  plugins: [
    includePaths({ paths: ['src'], extensions }),
    resolve(),
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
  external: ['react', 'react-dom', 'lodash.uniqueid', 'react-spring/renderprops.cjs'],
};
