# hds-core [![npm](https://img.shields.io/npm/v/hds-core?style=flat-square)](https://www.npmjs.com/package/hds-core) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/hds-core?label=gzipped%20size&style=flat-square)](https://bundlephobia.com/result?p=hds-core)

Base styles and individual HTML component styles for the Helsinki Design System.

:books: [See the components in Storybook](https://hds.hel.fi/storybook/core)

## Getting started

Install the package.

```bash
pnpm add hds-core
```

### What's included

The published npm package contains the built `lib/` directory (source files under `src/` are not included).

```
hds-core/
└── lib/
    ├── base.css / base.min.css     # base styles and CSS variables (min is the package main entry)
    ├── components/                 # HDS component styles
    │   ├── all.css / all.min.css   # bundled stylesheet including all components
    │   └── <component name>/       # per-component stylesheets
    │       ├── <component name>.css / .min.css
    │       └── _*.scss             # optional SCSS mixins for some components
    ├── fonts/                      # @font-face rules (font files served from CDN, not bundled)
    │   ├── fonts.css / fonts.min.css
    │   └── _font-variables.scss
    ├── icons/                      # HDS icon styles
    │   ├── icons.css / icons.min.css   # bundled stylesheet including all icons
    │   ├── icon.css / icon.min.css     # base styles for icons
    │   └── <icon name>.css / .min.css  # individual icon stylesheets (e.g. alert-circle.css)
    ├── scss/                       # shared SCSS helpers
    │   └── helpers.scss
    └── utils/                      # utility stylesheets and SCSS tooling
        ├── helpers.css / helpers.min.css
        ├── animations.css / animations.min.css
        └── multi-sass/             # SCSS utilities for BEM-style exports
```

### Using the styles

To import styles for all the core components, you'll need two stylesheets: `base.css` (the base styles and CSS variables) and `components/all.css`. If you use any of the icons, you'll also need `icons/icons.css`. Do note that the `components/all.css` bundles all the components and `icons/icons.css` bundles all the icons into single stylesheets and thus are large in filesize.

Therefore, we do recommend that you use individual component and icon stylesheets instead of the bundled styles.

```js
// import base styles and css variables (resolves to lib/base.min.css)
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
