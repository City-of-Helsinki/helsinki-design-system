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

## Adding and updating tokens

### Adding new tokens
To add new tokens, you first need to create a `.json` file in the `tokens` directory. Once you’ve created the `.json` file you add the tokens to it. You can read about how to define new tokens [here](https://amzn.github.io/style-dictionary/#/properties?id=properties
). The token files follow the [Category / Type / Item structure](https://amzn.github.io/style-dictionary/#/properties?id=category-type-item). You can use any of the existing token files as reference.

After the `.json` file with the tokens is done, you'll need to include it in the build process for the tokens to be built. To do that you need to add a new property to the `build.js` file.

#### Example:

Let’s say that we wanted to add a `bar.json` file at the location `tokens/foo` to the build process. In the `build.js` file we would add the following:
```js
// build the token files
Object.values({
  ...
  // new tokens 
  newTokens: dictionary.extend({
    // path to the file to build
    source: ['tokens/foo/bar.json'],           
    // the first parameter defines the output file name
    // the second parameter defines the output path
    platforms: getPlatformConfig('bar', 'foo'),
  })
  ...
}).forEach((item) => item.buildAllPlatforms());
```         
This would create `bar.css`, `bar.min.css` and `bar.scss` files to the `lib/foo` directory after running the build command.

### Updating existing tokens

Find the token you want to update and replace the value in the `value` field with the new one.

## Building the tokens

To build the tokens run
```
$ yarn build
```

## Using the tokens

Import any of the available `.css` or `.scss` files. Imported CSS variables will be applied to the `:root` element. 

## Built with

- [Style Dictionary](https://github.com/amzn/style-dictionary)
- [clean-css](https://github.com/jakubpawlowicz/clean-css-cli)
