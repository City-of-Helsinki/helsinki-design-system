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

## Adding a component

To add a new component, use the scaffold helper. In the react package folder, run:

```
yarn scaffold
```

Note that components at `packages/react` are tested for visual regression by Loki, so images of new items should be added to references.

You can add new or update existing reference images with follwoing command. Note `storiesFilter`, as otherwise all images are retaken which takes ages. 
Command uses Chrome in Docker container to prevent issues with Retina screen resolution, so Docker needs to be available. Also storybook should be running.
```
yarn update-reference-images --storiesFilter "<regexp of added story>"
```

Note that failure on the CI gives different update command, as tests are running against static storybook. You can still use `storiesFilter` from that command to retake failed reference images.

Note that images are stored to repo with [git lfs](https://git-lfs.github.com/).

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
