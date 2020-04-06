# hds-design-tokens [![npm version](https://badge.fury.io/js/hds-design-tokens.svg)](https://www.npmjs.com/package/hds-design-tokens)

Design tokens for the Helsinki Design System.

## Getting started

### What's included

```
hds-design-tokens/
├── tokens/                                 # token source files
└── lib/
    ├── color/
        ├── component/
            ├── all (.scss|.css)            # all component color variables
            ├── button (.scss|.css)         # button color variables
            └── text-input (.scss|.css)     # text-input color variables
        ├── all (.scss|.css)                # brand and ui color variables
        ├── brand (.scss|.css)              # brand color variables
        └── ui (.scss|.css)                 # ui color variables
    ├── spacing/                            
        ├── all (.scss|.css)                # all spacing variables
        ├── layout (.scss|.css)             # layout spacing variables
        └── spacing (.scss|.css)            # component spacing variables
    └── all (.scss|.css)                    # all variables
```

### Installing the package from npm:

```
$ yarn add hds-design-tokens
```

## Using the variables

Import the `variables.css` or `variables.min.css` files to get access to the CSS variables or `variables.scss` for SASS variables.

## Built with

- [Style Dictionary](https://github.com/amzn/style-dictionary)
- [clean-css](https://github.com/jakubpawlowicz/clean-css-cli)
