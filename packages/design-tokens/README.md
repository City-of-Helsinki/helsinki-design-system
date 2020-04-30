# hds-design-tokens [![npm version](https://badge.fury.io/js/hds-design-tokens.svg)](https://www.npmjs.com/package/hds-design-tokens)

Design tokens for the Helsinki Design System.

## Getting started

### Installing the package:

```
$ yarn add hds-design-tokens
```

### What's included

```
hds-design-tokens/
├── tokens/                                 # token source files
└── lib/
    ├── color/
    │    ├── component/
    │    │   ├── all (.scss|.css)            # all component color variables
    │    │   ├── <component> (.scss|.css)    # <component> color variables
    │    │   :
    │    │
    │    ├── all (.scss|.css)                # brand and ui color variables
    │    ├── brand (.scss|.css)              # brand color variables
    │    └── ui (.scss|.css)                 # ui color variables
    ├── spacing/                            
    │   ├── all (.scss|.css)                # all spacing variables
    │   ├── layout (.scss|.css)             # layout spacing variables
    │   └── spacing (.scss|.css)            # component spacing variables
    └── all (.scss|.css)                    # all variables
```

## Using the variables

Import any of the available `.css` or `.scss` files. Imported CSS variables will be applied to the `:root` element. 

## Built with

- [Style Dictionary](https://github.com/amzn/style-dictionary)
- [clean-css](https://github.com/jakubpawlowicz/clean-css-cli)
