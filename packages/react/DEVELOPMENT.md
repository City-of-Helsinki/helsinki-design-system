# Development

## Development environment

> Helsinki Design System uses [**Lerna**](https://lerna.js.org/) for running scripts across the repo as well as versioning and creating releases of the packages. [**Yarn workspaces**](https://yarnpkg.com/lang/en/docs/workspaces/) is used to manage dependencies. This allows the separate packages to reference each other via symlinks during local development.

### Setting up local development environment

0. Download and Install [git lfs](https://git-lfs.github.com/) which is used to store images outside repository.
```bash
git lfs install
```
1. Clone the HDS repository.
```bash
git clone https://github.com/City-of-Helsinki/helsinki-design-system.git
```

2. Go to the root of the project and install dependencies with `yarn`.
```bash
cd helsinki-design-system
yarn
```

3. Build the hds-core and hds-design-tokens packages. hds-react uses these packages as dependencies.
```bash
yarn build:tokens && yarn build:core
```

4. Start the development server.
```bash
yarn start:react
```

This starts the storybook development environment. You can read about how to write storybook stories [here](https://storybook.js.org/docs/react/get-started/whats-a-story). The use of Storybook is recommended for component development.

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

To add a new component, use the scaffold helper. In the react package folder, run:

```
yarn scaffold
```

Also note the section below about visual regression tests and adding new components.

## Visual regression tests

`hds-react` uses [Loki](https://loki.js.org/) for visual regression testing. Make sure [git lfs](https://git-lfs.github.com/) is installed properly
before running visual tests or modifying reference images. Reference images are stored in this repository with git-lfs.
Loki is using the Chrome browser inside a Docker container, so Docker needs to also be available.

### Running visual tests

To run the visual regression tests, you must first build the storybook by running `yarn build-storybook`. Then you can proceed with the test run by running `yarn visual-test`.

### Updating reference images

When adding a new component or after making visual changes to some existing component, you must update the corresponding reference image.
Before you can do this, you must start the local react storybook by issuing the following command in the root of the whole project:
```
yarn start:react
```
Then leave the storybook on the background and switch to another terminal window. Go to packages/react and issue this command:
```
yarn update-reference-images --storiesFilter "<name of the component or name of the story>"
```

You should pass the component name with `--storiesFilter` flag in order to update the reference images only for that single component.

## Workflow

This project uses the [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Happy branching!

## Git

Pull requests can be submitted from fork. [Read more from here.](https://guides.github.com/activities/forking/)

### Developing a feature:

```bash
git checkout -b <branchname>
git add <file1> <file2> ...
git commit -m "My commit message"
```

### Pushing your feature to Github:

```bash
git checkout develop
git pull
git checkout <branchname>
git rebase -i develop
```

- Resolve conflicts and continue:

```bash
git add <file1> <file2> ...
git rebase --continue
```

- After no conflicts:

```bash
git push --force-with-lease
```

(If your remote does not accept your local new branch: `git push -u origin HEAD`)

- Make a Pull Request at Github website.
