// eslint-disable-next-line
import { esbuildPlugin } from '@web/dev-server-esbuild';
import { fileURLToPath } from 'url';

export default {
  files: ['src/**/*.test.ts'],
  // plugins: [esbuildPlugin({ ts: true, tsconfig: './tsconfig.json' })],
  plugins: [esbuildPlugin({ ts: true })],
  nodeResolve: true,
};
