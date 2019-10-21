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

## Built with

- React with [TypeScript](https://www.typescriptlang.org/) support
- bundled with [Webpack](https://github.com/webpack/webpack), compiled with [Babel](https://github.com/babel/babel)
- [CSS Modules](https://github.com/css-modules/css-modules) with [typed-css-modules](https://github.com/Quramy/typed-css-modules) for styles
- [ESLint](https://github.com/eslint/eslint) for code analysis
- [Jest](https://github.com/facebook/jest) with [React Testing Library](https://github.com/testing-library/react-testing-library) for testing

## Contributing

The initial version of the Helsinki Design System is under development. We will accept new features, feature requests and help with improving the documentation in the future.
https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow

    "build": "yarn run lint && yarn run tcm && yarn run tsc && webpack --mode production",
    "start": "webpack --watch --mode development & tcm src --watch & yarn storybook",
    "tsc": "tsc",
    "tcm": "tcm src",
    "lint": "yarn eslint \"src/**/*.{ts,tsx}\"",
    "pre-commit": "yarn -s lint",
    "pre-push": "yarn -s test",
    "storybook": "start-storybook -p 6006 --quiet",
    "build-storybook": "build-storybook",
    "test": "jest"
