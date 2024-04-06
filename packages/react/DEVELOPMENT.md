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
| yarn start                   | Starts the development environment.                       |
| yarn test                    | Runs the tests.                                           |
| yarn lint                    | Runs the linting.                                         |
| yarn scaffold                | Runs the scaffolding script for creating a new component. |
| yarn visual-test             | Runst the visual regression tests.                        |
| yarn update-reference-images | Update reference images for visual regression tests.      |
| yarn update:hds-js           | Updates dependencies in the hds-js/package.json           |

## Adding a component

To add a new component, use the scaffold helper. Helper will automatically create placeholder component and folder structure for given name. You can also optionally create a core component with the same name. Helper will also automatically set the required exports. In the react package folder, run:

```bash
yarn scaffold
```

Also note the section below about visual regression tests and adding new components.

## Visual regression tests

`hds-react` uses [Loki](https://loki.js.org/) for visual regression testing.
Loki is using the Chrome browser inside a Docker container, so Docker needs to also be available.

### Running visual tests

To run the visual regression tests, you must first build the storybook by running `yarn build-storybook`. Then you can proceed with the test run by running `yarn visual-test`.

### Updating all reference images

Remove all reference images and create new ones. Before you can do this, you must first build the storybook by running `yarn build-storybook`.

Then you can issue this command:

```bash
yarn update-reference-images
```

### Updating reference images of a single story

When adding a new component or after making visual changes to some existing component, you must update the corresponding reference images. Before you can do this, you must first build the storybook by running `yarn build-storybook`.

Then you can issue this command:

```bash
yarn update-story-images <name or part of the name of the story>
```

You must pass the component's story name after the command. For example, to update Button story reference images, you can run:

```bash
yarn update-story-images Button
```

This script automatically adds loki's "--storiesFilter" command-line argument to the command.

[Here](https://github.com/oblador/loki/blob/master/docs/command-line-arguments.md) is more info about Loki-tests' command-line arguments
