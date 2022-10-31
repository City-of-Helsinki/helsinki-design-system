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

4. Start the development server.
```bash
yarn start:core
```

This starts the storybook development environment. You can read about how to write storybook stories [here](https://storybook.js.org/docs/html/get-started/whats-a-story). The use of Storybook is recommended for component development.

### Commands

| Command                            | Description                                          |
| ---------------------------------- | ---------------------------------------------------- |
| yarn                               | Install dependencies and link local packages.        |
| yarn build                         | Builds the package.                                  |
| yarn start                         | Starts the development environment.                  |

### Design Tokens

This project uses [hds-design-tokens](../design-tokens/README.md) as a dependency. It provides variables for colors, spacing, typography etc. that are used by the core package. Those variables should be used whenever possible. If you need to update or add new tokens, see [here](../design-tokens/DEVELOPMENT.md#adding-and-updating-tokens).

Remember to always build the tokens after updating or adding new ones, otherwise they won't be available.

## Workflow

This project uses the [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Happy branching!

## Built with

- [PostCSS](https://github.com/postcss/postcss)
- [Storybook](https://storybook.js.org/)
- hds-core follows the [BEM methodology](http://getbem.com/)
