<h1 align="center">Helsinki Design System</h1>

<div align="center">
  <strong>Design System for the City of Helsinki</strong>
</div>
<div align="center">
  Helsinki Design System (HDS) is an open-source design system built by the City of Helsinki. It consists of tools for development and design as well as resources and guidelines for creating user-friendly, accessible solutions for the city.
</div>

<br />

<div align="center">
  <!-- Version -->
  <a href="https://github.com/City-of-Helsinki/helsinki-design-system/releases/latest">
    <img src="https://img.shields.io/github/v/release/City-of-Helsinki/helsinki-design-system?label=version&style=flat-square"
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
    <a href="https://hds.hel.fi/getting-started/contributing/how-to-contribute">
      Contributing
    </a>
  </h4>
</div>

***

## Features

- **Accessibility baked-in** – All HDS components are designed from the ground up to be as accessible as possible. Components go through a third-party accessibility audit before release.
- **React & CSS** – Components are available both as React and CSS styles. Choose the one which suits best for your project.
- **Customizable** – HDS components are designed to be customizable to allow expressing the vibrant Helsinki brand.
- **Design and Implementation in sync** – Designers use a collection of Sketch libraries which are perfectly in sync with the implementation.

## Packages

HDS is divided into three (3) separate packages:

- [![npm](https://img.shields.io/npm/v/hds-core?label=hds-core&style=flat-square)](https://www.npmjs.com/package/hds-core) – Helsinki City brand colors, typography and base styles as css-styles and variables
- [![npm](https://img.shields.io/npm/v/hds-react?label=hds-react&style=flat-square)](https://www.npmjs.com/package/hds-react) – Provides HDS components implemented using React
- [![npm](https://img.shields.io/npm/v/hds-design-tokens?label=hds-design-tokens&style=flat-square)](https://www.npmjs.com/package/hds-design-tokens) – Basis of the HDS which includes base colors, typography etc. as design tokens.

## Getting started

:wrench: **Are you a developer? If yes, start by checking out [HDS - For developers page](https://hds.hel.fi/getting-started/developer).**<br />
:art: **Are you a designer? If yes, start by checking out [HDS - For designers page](https://hds.hel.fi/getting-started/designer).**

Helsinki Design System uses [**Lerna**](https://lerna.js.org/) for running scripts across the repo as well as versioning and creating releases of the packages. [**Yarn workspaces**](https://yarnpkg.com/lang/en/docs/workspaces/) is used to manage dependencies. This allows the separate packages to reference each other via symlinks during local development.

### Using the packages in your project

See the package specific instructions on how to get started using the packages.

- [hds-design-tokens](./packages/design-tokens/README.md#getting-started)
- [hds-core](./packages/core/README.md#getting-started)
- [hds-react](./packages/react/README.md#getting-started)

### Setting up local development environment

Start setting up your local development by going through the steps in [the development guide](./DEVELOPMENT.md).

## Contributing

**Before contributing, it is recommended to read [HDS Contribution - Before contributing page](https://hds.hel.fi/getting-started/contributing/how-to-contribute.**

We are accepting new features, feature requests and help with improving the documentation. There are multiple ways you can contribute:

- Opening [issues](https://github.com/City-of-Helsinki/helsinki-design-system/issues) about bugs/improvements/new features/etc.
- Opening [pull requests](https://github.com/City-of-Helsinki/helsinki-design-system/pulls) with changes/fixes/new features/etc.
- Opening branches in Abstract to propose new component designs or design changes. More information about design contribution can be found in [HDS Contribution - Design page](https://hds.hel.fi/getting-started/contributing/design).
- Take part in discussion and commenting new HDS features. The easiest way to do this is to browse open [issues](https://github.com/City-of-Helsinki/helsinki-design-system/issues) and [pull requests](https://github.com/City-of-Helsinki/helsinki-design-system/pulls) and leave a comment! If you have an access to the City of Helsinki Slack, you may also join the discussion there. More info about the ways to contact us can be found in [HDS About - Support page](https://hds.hel.fi/about).
