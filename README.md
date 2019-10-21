# City of Helsinki Design System

> A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications. - [Design Systems Handbook](https://www.designbetter.co/design-systems-handbook)

Helsinki Design System is an open-souce design system built by the City of Helsinki. It consists of tools for development and design as well as resources and guidelines for creating user-friendly, accessible solutions for the city.

## Getting started

> **Helsinki Design System** uses [**Lerna**](https://lerna.js.org/) and [**Yarn workspaces**](https://yarnpkg.com/lang/en/docs/workspaces/) to manage dependencies during local development. This allows the separate packages to reference each other locally via symlinks.

Are you a developer? If yes, you'll probably want to first check out the components in [hds-core](/tree/master/packages/core) and [hds-react](/tree/master/packages/react).

### Commands

| Commands                           | Description                                   |
| ---------------------------------- | --------------------------------------------- |
| yarn                               | Install dependencies and link local packages. |
| yarn start:\<platform>             | Start dev env for platform.                   |
| yarn build:\<platform>             | Build packages for platform.                  |
| lerna run build --scope \<package> | Build only \<package>.                        |

To ensure code quality in the repo, every package will have their `pre-commit` and `pre-push` scripts run automatically before git commit and push (added with [Husky](https://github.com/typicode/husky)).

## Documentation

The documentation will be in the future on an upcoming webpage. For now, please refer to the packages and codebase in this repository.

## Contributing

The initial version of the Helsinki Design System is under development. We will accept new features, feature requests and help with improving the documentation in the future.
