:books: [**See the components in Storybook**](https://city-of-helsinki.github.io/helsinki-design-system/storybook/core)

# hds-core [![npm version](https://badge.fury.io/js/hds-core.svg)](https://www.npmjs.com/package/hds-core)

Base styles and individual HTML component styles for the Helsinki Design System.

## Getting started

### Installing the package:

```
$ yarn add hds-core
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
    │   ├── all.css               # bundled stylesheet including all icons
    │   ├── icon.css              # base styles for icons
    │   ├── icon-<icon name>.css  # individual icon stylesheet
    │   :
    │
    ├── utils/          # utility stylesheets
    ├── variables/      # collection of css variables and base styles
    ├── helsinki.css    # default theme
    └── engel.css       # example alternative theme
```

## Using the styles

At the minimum you'll need two stylesheets to use the core components: `base.css` (the base styles and CSS variables) and `components/all.css`. If you use any of the icons, you'll also need `icons/all.css`. Do note that the `all.css`-files bundle all the components and icons into single stylesheets and thus are large in filesize.

Therefore, we do recommend that you use individual stylesheets where needed.

### Helsinki fonts

The Helsinki fonts are not included in the package due to copyright reasons.

### Overriding styles

Helsinki Design System uses CSS variables from the [hds-design-tokens](https://www.npmjs.com/package/hds-design-tokens) package to control coloring and layout. You can override these variables where needed.

## Built with

- [PostCSS](https://github.com/postcss/postcss)
- [Storybook](https://storybook.js.org/)
- hds-core follows the [BEM methodology](http://getbem.com/)
