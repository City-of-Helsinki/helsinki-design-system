# hds-core

Base styles and individual HTML component styles for the Helsinki Design System.

## Getting started

### What's included

```
hds-core/
├── examples/           # html example pages using core components
├── src/                # source css
└── lib/
    ├── components/     # collection of HDS component styles
    │   ├── all.css           # bundled stylesheet including all components
    │   ├── buttons.css       # individual component stylesheet
    │   :
    ├── icons/          # collection of HDS icon styles
    │   ├── all.css           # bundled stylesheet including all icons
    │   ├── icon.css          # base styles for icons
    │   ├── icon-check.css    # individual icon stylesheet
    │   :
    ├── utils/          # utility stylesheets
    ├── variables/      # collection of css variables and base styles
    ├── helsinki.css    # default theme
    └── engel.css       # example alternative theme
```

### Installing the package from npm:

```
$ yarn add hds-core
```

## Using the styles

At the minimum you'll need two stylesheets to use the core components: `helsinki.css` (the base theme) and `components/all.css`. If you use any of the icons, you'll also need `icons/all.css`. Do note that the `all.css`-files bundle all the components and icons into single stylesheets and thus are large in filesize.

Therefore, we do recommend that you use individual stylesheets where needed. For reference, see the files in `examples` folder. For example [buttons.html](examples/buttons.html).

### Helsinki fonts

Due to copyright reasons the Helsinki fonts are not included in the package. To test your implementation you can use the `example_fonts` stylesheet in [examples/css/example_fonts.css](examples/css/example_fonts.css).

### Overriding styles

Helsinki Design System uses a number of CSS variables to control coloring and layout. You can override these variables where needed. See the alternative theme (Engel)[src/engel.css] for an example.

## Built with

- [PostCSS](https://github.com/postcss/postcss)
