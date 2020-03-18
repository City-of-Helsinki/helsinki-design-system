:books: [**See the components in Storybook**](https://city-of-helsinki.github.io/helsinki-design-system/storybook/)

# hds-react [![npm version](https://badge.fury.io/js/hds-react.svg)](https://www.npmjs.com/package/hds-react)

A collection of Helsinki Design System components implemented using React.

## Getting started

Install the package:

```
$ yarn add hds-react
```

Import components:

```
import { TextInput } from "hds-react";
```

**I am not seeing any styles**  
`hds-react` uses CSS modules under the hood. If your tooling, for instance webpack, is missing support for CSS modules, components may be left without styles altogether. Here's a quick example of how you can declare support for CSS modules without changing behavior for regular CSS files. These rules assume that the files meant for CSS module support have been named like so: `*.module.css`.

```js
{
  test: /\.css$/,
  exclude: /\.module\.css$/,
  use: [
    'style-loader',
    'css-loader',
  ],
},
{
  test: /\.css$/,
  include: /\.module\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: { importLoaders: 1, modules: true },
    },
  ],
},
```
