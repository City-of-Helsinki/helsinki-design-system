import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import includePaths from 'rollup-plugin-includepaths';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';

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
    eslint(),
    includePaths({ paths: ['src'], extensions }),
    postcss({
      modules: true,
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
  ],
  external: ['lodash', 'react-spring/renderprops.cjs'],
};
