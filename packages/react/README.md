# hds-react [![npm](https://img.shields.io/npm/v/hds-react?style=flat-square)](https://www.npmjs.com/package/hds-react) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/hds-react?label=gzipped%20size&style=flat-square)](https://bundlephobia.com/result?p=hds-react)

A library of Helsinki Design System components implemented using React.

:books: [See the components in Storybook](https://hds.hel.fi/storybook/react)

## Getting started

Install the package.

```bash
yarn add hds-react
```

### Using the components

JS
```js
import { TextInput } from "hds-react";

// you can also import components individually instead of importing the whole package
import { TextInput } from "hds-react/components/TextInput";
```

### Helsinki fonts

The Helsinki fonts are not included in the package due to copyright reasons.

## Development

Read more [here](DEVELOPMENT.md).

## Built with

- React with [TypeScript](https://www.typescriptlang.org/) support
- Bundled with [Rollup](https://github.com/rollup/rollup), compiled with [Babel](https://github.com/babel/babel)
- [CSS Modules](https://github.com/css-modules/css-modules) with [typed-css-modules](https://github.com/Quramy/typed-css-modules) for styles
- [ESLint](https://github.com/eslint/eslint) for code analysis
- [Prettier](https://github.com/prettier/prettier) for code formatting
- [Jest](https://github.com/facebook/jest) with [React Testing Library](https://github.com/testing-library/react-testing-library) for testing
- [Loki](https://loki.js.org/) for visual regression testing

## Supported browsers

Helsinki Design System uses the react-scripts library's default browserslist config to target a broad range of browsers.
This means that the following browsers are supported:

- Chrome
- Chrome for Android
- Chrome for iOS ([uses same engine as Safari iOS](https://github.com/browserslist/browserslist#browsers))
- Edge
- Edge for Android ([uses same engine as Chrome for Android](https://github.com/browserslist/browserslist#browsers))
- Edge for iOS ([uses same engine as Safari iOS](https://github.com/browserslist/browserslist#browsers))
- Firefox
- Firefox for Android
- Firefox for iOS ([uses same engine as Safari iOS](https://github.com/browserslist/browserslist#browsers))
- Safari
- Safari iOS

The supported browser versions are listed in [browserslists test page](https://browsersl.ist/#q=%3E+0.2%25%2C+not+dead%2C+not+op_mini+all&region=FI)

More info about browser support:

- [Create React App - Configuring Supported Browsers](https://create-react-app.dev/docs/supported-browsers-features/#configuring-supported-browsers)
- [HDS documentation general FAQ - What browser and browser versions are supported?](https://hds.hel.fi/getting-started/faq#general)
