# hds-react

A collection of Helsinki Design System components implemented using React.

## Getting started

> **Helsinki Design System** uses [**Lerna**](https://lerna.js.org/) and [**Yarn workspaces**](https://yarnpkg.com/lang/en/docs/workspaces/) to manage dependencies during local development. This allows the separate packages to reference each other locally via symlinks.

```
# Clone the repo
git clone https://github.com/City-of-Helsinki/helsinki-design-system.git
cd helsinki-design-system

# Install dependencies
yarn

# Start React-development (watch packages for changes, launch Storybook)
yarn start:react
```

## Contributing

### Adding a component

To add a new compoment, use the scaffold helper (in the react package folder):

```
yarn scaffold
```

### Workflow

This project uses the [Git Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). Happy branching!

## Built with

- React with [TypeScript](https://www.typescriptlang.org/) support
- bundled with [Webpack](https://github.com/webpack/webpack), compiled with [Babel](https://github.com/babel/babel)
- [CSS Modules](https://github.com/css-modules/css-modules) with [typed-css-modules](https://github.com/Quramy/typed-css-modules) for styles
- [ESLint](https://github.com/eslint/eslint) for code analysis
- [Jest](https://github.com/facebook/jest) with [React Testing Library](https://github.com/testing-library/react-testing-library) for testing
