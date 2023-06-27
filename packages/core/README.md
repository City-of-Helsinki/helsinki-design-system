# hds-core [![npm](https://img.shields.io/npm/v/hds-core?style=flat-square)](https://www.npmjs.com/package/hds-core) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/hds-core?label=gzipped%20size&style=flat-square)](https://bundlephobia.com/result?p=hds-core)

Base styles and individual HTML component styles for the Helsinki Design System.

:books: [See the components in Storybook](https://hds.hel.fi/storybook/core)

## Getting started

Install the package.

```bash
yarn add hds-core
```

### What's included

```
hds-core/
├── src/                # source css
└── lib/
    ├── components/     # collection of HDS component styles
    │   ├── all.css               # bundled stylesheet including all components
    |   └── <component name>/     # component stylesheets
    │       ├── <component name>.css
    │       :
    │
    ├── icons/          # collection of HDS icon styles
    │   ├── icons.css               # bundled stylesheet including all icons
    │   ├── icon.css              # base styles for icons
    │   ├── icon-<icon name>.css  # individual icon stylesheet
    │   :
    │
    ├── utils/          # utility stylesheets
    ├── variables/      # collection of css variables and base styles
    └── base.css        # base styles
```

### Using the styles

To import styles for all the core components, you'll need two stylesheets: `base.css` (the base styles and CSS variables) and `components/all.css`. If you use any of the icons, you'll also need `icons/icons.css`. Do note that the `components/all.css` bundles all the components and `icons/icons.css` bundles all the icons into single stylesheets and thus are large in filesize.

Therefore, we do recommend that you use individual component and icon stylesheets instead of the bundled styles.

JS
```js
// import base styles and css variables
import "hds-core";
```

### Helsinki fonts

The Helsinki fonts are not included in the package due to copyright reasons.

### Overriding styles

Helsinki Design System uses CSS variables from the [hds-design-tokens](https://www.npmjs.com/package/hds-design-tokens) package to control coloring, spacing and layout. You can override these variables if necessary, but it is not recommended.

## Development

Read more [here](DEVELOPMENT.md).

## Built with

- [PostCSS](https://github.com/postcss/postcss)
- [Storybook](https://storybook.js.org/)
- hds-core follows the [BEM methodology](http://getbem.com/)
