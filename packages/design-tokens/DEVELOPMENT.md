# Development

## Development environment

> Helsinki Design System uses [**Lerna**](https://lerna.js.org/) for running scripts across the repo as well as versioning and creating releases of the packages. [**Yarn workspaces**](https://yarnpkg.com/lang/en/docs/workspaces/) is used to manage dependencies. This allows the separate packages to reference each other via symlinks during local development.

### Setting up local development environment

1. Clone the HDS repository.

```bash
git clone https://github.com/City-of-Helsinki/helsinki-design-system.git
```

2. Go to the root of the project and install dependencies with `yarn`.

```bash
cd helsinki-design-system
yarn
```

3. Build the design tokens.

```bash
yarn build:tokens
```

### Commands

| Command    | Description                                   |
| ---------- | --------------------------------------------- |
| yarn       | Install dependencies and link local packages. |
| yarn build | Builds the package.                           |

## Adding and updating tokens

### Adding new tokens

To add new tokens, you first need to create a `.json` file in the `tokens` directory. Once you’ve created the `.json` file you add the tokens to it. You can read about how to define new tokens [here](https://github.com/amzn/style-dictionary#design-tokens). The token files follow the [Category / Type / Item structure](https://github.com/amzn/style-dictionary#categorytypeitem-structure). You can use any of the existing token files as reference.

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
yarn build
```

## Workflow

This project uses the [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Happy branching!
