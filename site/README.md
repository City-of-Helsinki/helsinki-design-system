# Helsinki Design System documentation site

This is the public documentation site of Helsinki Design System ([hds.hel.fi](https://hds.hel.fi/)). It is built with [Gatsby](https://www.gatsbyjs.com/) and it bases on [Gatsby's default starter](https://github.com/gatsbyjs/gatsby-starter-default).
- General introduction of Helsinki Design System
- Getting started section for designers and developers
- Guidelines for accessibility, grid, localisation and more
- Guidelines for visual assets such as icons and Helsinki logo
- Design token documentation
- Component documentation
- About section with news, release notes and road map
- Resources section
- Contribution guidelines
- Form examples and patterns

## Getting started

When making changes to the documentation website, the recommended way is to get it running locally. This way you can review and see your changes in real-time like they would show up in production.

### Setting up the local development environment

1. Clone the HDS repository.
```
git clone https://github.com/City-of-Helsinki/helsinki-design-system.git
```

2. Go to the root of the project and install dependencies with `yarn`.
```
cd helsinki-design-system
yarn
```

3. Build packages with `yarn`. Note, you need to build all HDS packages since the documentation site uses those as well.
```
yarn build
```

4. Install local dependencies.
```
cd site
yarn
```

5. Start the development server. It will watch for file changes automatically.
```
yarn start
```

6. Open the browser of your choice (Chrome recommended) and navigate to http://localhost:8000/. You should now see the documentation site.

**Note!** You may need to rerun `yarn build` if you make changes to config files or if other HDS packages are updated.

### Commands

| Command                            | Description                                               |
| ---------------------------------- | --------------------------------------------------------- |
| yarn                               | Install dependencies.                                     |
| yarn build                         | Lints and builds documentation.                           |
| yarn start                         | Starts the development server.                            |
| yarn lint                          | Runs the linting.                                         |
| yarn format                        | Format all code.                                          |
| yarn serve                         | Serve production site.                                    |
| yarn clean                         | Clear Gatsby cache.                                       |
| yarn scaffold                      | Runs the scaffolding script for creating a new component. |

### Hosting in Github pages

There might be a need to prefix asset and pages paths when the site is hosted in Github pages. This can be done by giving the pathPrefix as a command-line argument or by replacing the pathPrefix configuration in gatsby-config.js
Running build with path prefixes example:
```
PATH_PREFIX='/hds-demo/docsite-fixes' yarn build -- --prefix-paths
```
[Here](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/) is more info about hosting Gatsby site in Github pages.

## Troubleshooting
- **Site build fails with error #11903 COMPILATION or something similar**. Gatsby's cache might not be in sync with the source files due to a checkout (chancing branches, etc.)  
  **Solution:** Run `$(npm bin)/gatsby clean` or manually remove .cache folder to clean up cache files. Then try to run the build again.
