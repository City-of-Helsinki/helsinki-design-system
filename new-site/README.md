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

4. Start the development server. It will watch for file changes automatically.
```
cd new-site
yarn start
```

5. Install local dependencies.
```
yarn
```


6. Start the development server. It will watch for file changes automatically.
```
cd new-site
yarn start
```

7. Open the browser of your choice (Chrome recommended) and navigate to http://localhost:8000/. You should now see the documentation site.

**Note!** You may need to rerun `yarn build` if you make changes to config files or if other HDS packages are updated.
