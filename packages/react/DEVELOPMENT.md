# Development

### Prerequisites

Set up your local development environment by following the steps in the [development guide](../../DEVELOPMENT.md#setting-up-local-development-environment).

### Setting up local development environment

1. Build the hds-core and hds-design-tokens packages in the root folder. hds-react uses these packages as dependencies.

```bash
yarn build:tokens && yarn build:core
```

2. Start the development server in the root folder. This starts the storybook development environment. You can read about how to write storybook stories [here](https://storybook.js.org/docs/react/get-started/whats-a-story). The use of Storybook is recommended for component development.

```bash
yarn start:react
```

### Commands

| Command                      | Description                                               |
| ---------------------------- | --------------------------------------------------------- |
| yarn                         | Install dependencies and link local packages.             |
| yarn build                   | Builds the React package.                                 |
| yarn build:hds-js            | Builds the hds-js package.                                |
| yarn build:hds-js-standalone | Builds standalone files for hds-js package.               |
| yarn start                   | Starts the development environment.                       |
| yarn nolint                  | Starts the development environment without eslint.        |
| yarn test                    | Runs the tests.                                           |
| yarn lint                    | Runs the linting.                                         |
| yarn scaffold                | Runs the scaffolding script for creating a new component. |
| yarn update:hds-js           | Updates dependencies in the hds-js/package.json           |

## Adding a component

To add a new component, use the scaffold helper. Helper will automatically create placeholder component and folder structure for given name. You can also optionally create a core component with the same name. Helper will also automatically set the required exports. In the react package folder, run:

```bash
yarn scaffold
```

Also note the section below about visual regression tests and adding new components.

## Visual regression tests

Storybook screenshots and component flows are covered by [Playwright](https://playwright.dev/) in the repository root [`e2e`](../../e2e) workspace (shared with `hds-core`). See [`e2e/README.md`](../../e2e/README.md) for how to run tests and update snapshots (including filtering by package or component).