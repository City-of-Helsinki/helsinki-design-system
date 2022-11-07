# Development

## Development environment

> Helsinki Design System uses [**Lerna**](https://lerna.js.org/) for running scripts across the repo as well as versioning and creating releases of the packages. [**Yarn workspaces**](https://yarnpkg.com/lang/en/docs/workspaces/) is used to manage dependencies. This allows the separate packages to reference each other via symlinks during local development.

### Prerequisites

- [Node](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (for visual regression tests)
- [Git lfs](https://git-lfs.github.com/) (installation instructions below)

### Setting up local development environment

1. Download and Install [git lfs](https://git-lfs.github.com/) which is used to store images outside repository.

```bash
git lfs install
```

2. Clone the HDS repository.

```bash
git clone https://github.com/City-of-Helsinki/helsinki-design-system.git
```

3. Go to the root of the project and install dependencies with `yarn`.

```bash
cd helsinki-design-system
yarn
```

4. Build packages with `yarn build`. This builds all packages; core, react, design-tokens and site (documentation).

```bash
yarn build
```

5. Start the development server. You can start these individually for each platform with `yarn start:<platform>`. For example, to start the React Storybook development environment, run:

```bash
yarn start:react
```

### Commands

| Command                            | Description                                                                        |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| yarn                               | Installs dependencies and links local packages.                                    |
| yarn build                         | Builds all the packages.                                                           |
| yarn build:\<package>              | Builds a specific package (`tokens`, `core`, `react` or `site`).                   |
| yarn start:\<platform>             | Starts the development environment for a specific platform (`core` or `react`).    |
| release                            | Publishes packages that have changed since the last release.                       |
| update-versions                    | Bump version of packages to publish.                                               |

To ensure code quality in the repo, every package will have their `pre-commit` and `pre-push` scripts run automatically before git commit and push (added with [**Husky**](https://github.com/typicode/husky)).

## Workflow

This project uses the [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Happy branching!

1. Get latest updates from the `master` branch.

```bash
git checkout master
git pull
```

2. Create a new branch for your changes.

```bash
git checkout -b hds-<Ticket number>-<Pull request title>
```

3. Push changes to the HDS remote repository.

```bash
git push --set-upstream origin hds-<Ticket number>-<Pull request title>
```

4. Make a Pull Request on the [HDS Github website](https://github.com/City-of-Helsinki/helsinki-design-system/pulls).
