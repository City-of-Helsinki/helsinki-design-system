# Development

The `hds-js` is a custom export from the [hds-react](https://github.com/City-of-Helsinki/helsinki-design-system/tree/development/packages/react) package. It has no own source files; the files are hand-picked from the React-version.

## Adding files to the bundle

Add required exports to the `index.ts` and run `yarn update:hds-js` from the `packages/react` folder.

## Building

The bundle is built with the `rollup.config.js` in the `hds-react` package. Rollup makes sure React or CSS are not included in this bundle.

The build command is in the `hds-react` package. Use `yarn build:hds-js`.

## Standalone

Standalone version bundles exported Javascript files as a single file that can be run without installing any dependencies.

Currently only the `hds-js/standalone/cookieConsent.ts` file is bundled. The file is manually set in the `packages/react/rollup.config.js`.

### Building

**HDS core must be build first!**

The build command is in the `hds-react` package.
Run the new build command `yarn build:hds-js-standalone`. The bundled javascript is built to `hds-js/lib/standalone/`.

### Running

Copy `hds-js/standalone/example.html` to `hds-js/lib/`

Run the example.html in the browser.

### Adding files to the bundle

Add a file to the `packages/hds-js/standalone` folder and add a single export to it.

Add the file also to the `packages/react/rollup.config.js`.
