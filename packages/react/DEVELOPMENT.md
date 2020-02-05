# Development

## Development environment

> Helsinki Design System uses [**Lerna**](https://lerna.js.org/) for running scripts across the repo as well as versioning and creating releases of the packages. [**Yarn workspaces**](https://yarnpkg.com/lang/en/docs/workspaces/) is used to manage dependencies. This allows the separate packages to reference each other via symlinks during local development.

```
# Clone the repo
git clone https://github.com/City-of-Helsinki/helsinki-design-system.git
cd helsinki-design-system

# Install dependencies
yarn

# Start React-development (watch packages for changes, launch Storybook)
yarn start:react
```

The use of Storybook is recommended for component development.

## Adding a component

To add a new compoment, use the scaffold helper (in the react package folder):

```
yarn scaffold
```

## Workflow

This project uses the [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Happy branching!

## Built with

- React with [TypeScript](https://www.typescriptlang.org/) support
- bundled with [Webpack](https://github.com/webpack/webpack), compiled with [Babel](https://github.com/babel/babel)
- [CSS Modules](https://github.com/css-modules/css-modules) with [typed-css-modules](https://github.com/Quramy/typed-css-modules) for styles
- [ESLint](https://github.com/eslint/eslint) for code analysis
- [Jest](https://github.com/facebook/jest) with [React Testing Library](https://github.com/testing-library/react-testing-library) for testing


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
