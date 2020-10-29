# hds-design-tokens [![npm](https://img.shields.io/npm/v/hds-design-tokens?style=flat-square)](https://www.npmjs.com/package/hds-design-tokens) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/hds-design-tokens?label=gzipped%20size&style=flat-square)](https://bundlephobia.com/result?p=hds-design-tokens)

Design tokens for the Helsinki Design System.

## Getting started

### Installing the package:

```
yarn add hds-design-tokens
```

### What's included

```
hds-design-tokens/
├── tokens/                                 # token source files
└── lib/
    ├── breakpoint/
    │    ├── all (.scss|.css)
    │    ├── breakpoint (.scss|.css)        # breakpoint variables
    │    └── container-width (.scss|.css)   # container-width variables
    ├── color/
    │    ├── all (.scss|.css)
    │    ├── brand (.scss|.css)             # brand color variables
    │    └── ui (.scss|.css)                # ui color variables
    ├── spacing/                            
    │   ├── all (.scss|.css)
    │   ├── layout (.scss|.css)             # layout spacing variables
    │   └── spacing (.scss|.css)            # component spacing variables
    ├── typography/                            
    │   ├── all (.scss|.css)
    │   ├── font (.scss|.css)               # font variables
    │   ├── font-size (.scss|.css)          # font-size variables
    │   └── line-height (.scss|.css)        # line-height variables
    └── all (.scss|.css)                    # all variables
```

### Using the tokens
Import any of the available `.css` or `.scss` files. Imported CSS variables will be applied to the `:root` element.

JS
```js
// import all tokens
import 'hds-design-tokens';
```

SCSS
```scss
@import '~hds-design-tokens';
```

## Development
Read more [here](DEVELOPMENT.md).

## Built with
- [Style Dictionary](https://github.com/amzn/style-dictionary)
- [clean-css](https://github.com/jakubpawlowicz/clean-css-cli)
