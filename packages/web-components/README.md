# hds-web-components

[![npm](https://img.shields.io/npm/v/hds-web-components?style=flat-square)](https://www.npmjs.com/package/hds-web-components)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/hds-web-components?label=gzipped%20size&style=flat-square)](https://bundlephobia.com/result?p=hds-web-components)
[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)

[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/contains-technical-debt.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/not-a-bug-a-feature.svg)](https://forthebadge.com)

A library of Helsinki Design System components implemented using Web Components.

Helsinki Design System Web Components library will provide a collection of web components for building websites and applications. Using these components will help developers to rapidly create user interfaces that are in line with the Helsinki City Design Language as well as accessible and consistent in behaviour across applications.

> Please note that the web components library is still in its early development.

:books: [See the components in Storybook](https://hds.hel.fi/storybook/web-components)


## Getting started
Install the package.

```bash
yarn add hds-web-components
```


### Using the components
You can use the hds-web-components library as a node package or load it directly with a script tag. You will need to load the library with the script tag if either of these conditions apply:

- you're using the web components in an environment where the page isn't created dynamically at runtime
- you want or need to use the components in your HTML files


#### Using the components in a Node environment
If you're using a Node environment you may install the package from the npm registry:

```bash
yarn add hds-web-components
```


#### Using the components directly in HTML
You may just include the JS file that defines the components:

```html
<script src='/path/to/web-components-dist-file.js'></script>
```

It doesn't matter if you put the script tag in the head or the body section of your HTML.


## Built with
- [Lit](https://lit.dev/) web components library
- [TypeScript](https://www.typescriptlang.org/)
- Bundled with [Rollup](https://github.com/rollup/rollup), compiled with [Babel](https://github.com/babel/babel)
- [CSS Modules](https://github.com/css-modules/css-modules) with [typed-css-modules](https://github.com/Quramy/typed-css-modules) for styles
- [ESLint](https://github.com/eslint/eslint) for code analysis
- [Prettier](https://github.com/prettier/prettier) for code formatting
- [Jest](https://github.com/facebook/jest) with [React Testing Library](https://github.com/testing-library/react-testing-library) for testing
- [Loki](https://loki.js.org/) for visual regression testing


## Supported browsers
Some. Opera Mini probably not supported though........,,,,
