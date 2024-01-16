# Development

The `hds-js` is a custom export from the [hds-react](https://github.com/City-of-Helsinki/helsinki-design-system/tree/development/packages/react) package. It has no own source files; the files are hand-picked from the React-version.

## Adding files to the bundle

Add required exports to the `index.ts` and run `yarn update:hds-js` from the `packages/react` folder.

## Building

The bundle is built with the `rollup.config.js` in the `hds-react` package. Rollup makes sure React or CSS are not included in this bundle.

The build command is in the `hds-react` package. Use `yarn build:hds-js`.
