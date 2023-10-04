# Development

### Prerequisites

Set up your local development environment by following the steps in the [development guide](../../DEVELOPMENT.md#setting-up-local-development-environment).

### Setting up local development environment

1. Build the design tokens in the root folder.

```bash
yarn build:tokens
```

2. Start the development server. This starts the storybook development environment in the root folder. You can read about how to write storybook stories [here](https://storybook.js.org/docs/html/get-started/whats-a-story). The use of Storybook is recommended for component development.

```bash
yarn start:core
```

### Commands

| Command                            | Description                                          |
| ---------------------------------- | ---------------------------------------------------- |
| yarn                               | Install dependencies and link local packages.        |
| yarn build                         | Builds the package.                                  |
| yarn start                         | Starts the development environment.                  |

### Design Tokens

This project uses [hds-design-tokens](../design-tokens/README.md) as a dependency. It provides variables for colors, spacing, typography etc. that are used by the core package. Those variables should be used whenever possible. If you need to update or add new tokens, see [here](../design-tokens/DEVELOPMENT.md#adding-and-updating-tokens).

Remember to always build the tokens after updating or adding new ones, otherwise they won't be available.

## Built with

- [PostCSS](https://github.com/postcss/postcss)
- [Storybook](https://storybook.js.org/)
- hds-core follows the [BEM methodology](http://getbem.com/)
