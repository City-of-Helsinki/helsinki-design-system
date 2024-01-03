# Development

The `hds-js` js is a custom export from the [hds-react](https://github.com/City-of-Helsinki/helsinki-design-system/tree/development/packages/react) package. It has no own source files; the files are hand-picked from the React-version.

## Adding files to the bundle

Add an export to the `index.ts`. Nothing else is needed. `Package.json` is auto-generated in the build process.

## Building

The bundle is built with the `rollup.config.js` in the `hds-react` package. Rollup makes sure React or CSS is included in this bundle.

The build command is in the `hds-react` package. Use `yarn build:hds-js`.
