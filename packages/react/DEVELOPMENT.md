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

| Command                            | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| yarn                               | Install dependencies and link local packages.             |
| yarn build                         | Builds the package.                                       |
| yarn start                         | Starts the development environment.                       |
| yarn test                          | Runs the tests.                                           |
| yarn lint                          | Runs the linting.                                         |
| yarn scaffold                      | Runs the scaffolding script for creating a new component. |
| yarn visual-test                   | Runst the visual regression tests.                        |
| yarn update-reference-images       | Update reference images for visual regression tests.      |

## Adding a component

To add a new component, use the scaffold helper. Helper will automatically create placeholder component and folder structure for given name. You can also optionally create a core component with the same name. Helper will also automatically set the required exports. In the react package folder, run:

```bash
yarn scaffold
```
Also notice below steps:
- Add the new component to rollup.config.js file's esmInput variable. Use same format as other components.
- Review that the component is exported from component’s index.ts and components folder's index.ts files
- If the component has related component on core side, remember to add the component’s css to all.css file in core folder. Otherwise core styles won't be exported and cannot be used in the react component.


Also note the section below about visual regression tests and adding new components.

## Visual regression tests

`hds-react` uses [Loki](https://loki.js.org/) for visual regression testing.
Loki is using the Chrome browser inside a Docker container, so Docker needs to also be available.

### Running visual tests

To run the visual regression tests, you must first build the storybook by running `yarn build-storybook`. Then you can proceed with the test run by running `yarn visual-test`.

### Updating reference images

When adding a new component or after making visual changes to some existing component, you must update the corresponding reference image. Before you can do this, you must start the local react storybook by issuing the following command in the root of the whole project:

```bash
yarn start:react
```

Then leave the storybook on the background and switch to another terminal window. Go to packages/react and issue this command:

```bash
yarn update-reference-images --storiesFilter "<name or part of the name of the story>"
```

You should pass the component's story name with --storiesFilter flag to update the reference images only for that single component story.
For example, to update Button story reference images, you can run:

```bash
yarn update-reference-images --storiesFilter "Button"
```

[Here](https://github.com/oblador/loki/blob/master/docs/command-line-arguments.md) is more info about Loki-tests' command-line arguments
