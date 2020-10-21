<h1 align="center">Helsinki Design System (beta)</h1>

<div align="center">
  <strong>Design System for the City of Helsinki</strong>
</div>
<div align="center">
  Helsinki Design System (HDS) is an open-source design system built by the City of Helsinki. It consists of tools for development and design as well as resources and guidelines for creating user-friendly, accessible solutions for the city.
</div>

<div align="center">
  <!-- Version -->
  <a href="https://github.com/City-of-Helsinki/helsinki-design-system/releases/latest">
    <img src="https://img.shields.io/github/v/release/City-of-Helsinki/helsinki-design-system?label=alpha-release&style=flat-square"
      alt="Version" />
  </a>
  <!-- Licence -->
  <a href="https://github.com/City-of-Helsinki/helsinki-design-system/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/City-of-Helsinki/helsinki-design-system?style=flat-square"
      alt="Licence (MIT)" />
  </a>
</div>

<div align="center">
  <h4>
    <a href="http://hds.hel.fi">
      HDS documentation
    </a>
    <span> | </span>
    <a href="https://hds.hel.fi/components">
      Available components
    </a>
    <span> | </span>
    <a href="https://hds.hel.fi/storybook/react/">
      React Storybook
    </a>
    <span> | </span>
    <a href="https://hds.hel.fi/storybook/core">
      Core Storybook
    </a>
    <span> | </span>
    <a href="https://hds.hel.fi/contributing/before-contributing">
      Contributing
    </a>
  </h4>
</div>

***

## Features

- **Accessibility baked-in** – All HDS components are from the ground up designed to be as accessible as possible. Components go through a third-party accessibility audit before release.
- **React & CSS** – Components are available both as React and CSS styles. Choose the one which suits the best for your project.
- **Customizable** – HDS components are designed to be customizable to allow expressing the vibrant Helsinki brand.
- **Design and Implementation in sync** – Designers use a collection of Sketch libraries which are perfectly in sync with the implementation. 

## Packages

HDS is divided into three (3) separate packages:

- [![npm](https://img.shields.io/npm/v/hds-core?label=hds-core&style=flat-square)](https://www.npmjs.com/package/hds-core) – Helsinki City brand colors, typography and base styles as css-styles and variables
- [![npm](https://img.shields.io/npm/v/hds-react?label=hds-react&style=flat-square)](https://www.npmjs.com/package/hds-react) – Provides HDS components implemented using React
- [![npm](https://img.shields.io/npm/v/hds-design-tokens?label=hds-design-tokens&style=flat-square)](https://www.npmjs.com/package/hds-design-tokens) – Basis of the HDS which includes base colors, typography etc. as design tokens.

## Getting started

**Are you a developer? If yes, you'll probably want to first check out the components in [hds-react](packages/react) and [hds-core](packages/core).**

Helsinki Design System uses [**Lerna**](https://lerna.js.org/) for running scripts across the repo as well as versioning and creating releases of the packages. [**Yarn workspaces**](https://yarnpkg.com/lang/en/docs/workspaces/) is used to manage dependencies. This allows the separate packages to reference each other via symlinks during local development.

### Commands

| Command                            | Description                                                |
| ---------------------------------- | ---------------------------------------------------------- |
| yarn                               | Install dependencies and link local packages.              |
| yarn start:\<platform>             | Start dev env for platform.                                |
| yarn build:\<platform>             | Build packages for platform.                               |
| lerna run build --scope \<package> | Build only \<package>.                                     |
| lerna publish                      | Publish packages that have changed since the last release. |

To ensure code quality in the repo, every package will have their `pre-commit` and `pre-push` scripts run automatically before git commit and push (added with [**Husky**](https://github.com/typicode/husky)).

## Contributing

The initial version of the Helsinki Design System is under development. We will accept new features, feature requests and help with improving the documentation in the future.
