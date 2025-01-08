import type { StorybookConfig } from '@storybook/react-vite';

import { join, dirname, resolve } from 'path';

import { mergeConfig } from 'vite';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const rootDir = process.cwd();

const config: StorybookConfig = {
  // stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  
  stories: ['./stories/*story.@(js|jsx|mjs|ts|tsx)', '../src/components/**/*story.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@saucelabs/storybook-variants'),
    getAbsolutePath('@storybook/addon-controls'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  viteFinal: async (config) => {
    const rootDir = resolve(__dirname, '..');
    
    console.log('Debug - Resolving from rootDir:', rootDir);
    
    return mergeConfig(config, {
      resolve: {
        alias: [
          { find: '@', replacement: resolve(rootDir, 'src') },
          { find: /^src\/(.*)$/, replacement: resolve(rootDir, 'src/$1') }
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      },
      plugins: [
        {
          name: 'debug-module-resolution',
          configureServer(server) {
            server.middlewares.use((req, res, next) => {
              console.log('Requested module:', req.url);
              next();
            });
          }
        }
      ],
      // build: {
      //   sourcemap: true
      // },
      // optimizeDeps: {
      //   entries: ['src/**/*.ts'],
      //   include: ['@storybook/react'],
      //   force: true,
      //   esbuildOptions: {
      //     resolveExtensions: ['.ts', '.tsx'],
      //     platform: 'browser'
      //   }
      // }
    });
  }
};
export default config;
