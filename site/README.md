# Helsinki Design System documentation site

This is the public documentation site of Helsinki Design System ([hds.hel.fi](https://hds.hel.fi/)). It is built with [docz](https://www.docz.site/) which is powered by [Gatsby](https://www.gatsbyjs.com/). Documentation site includes:

- Getting started section for designers and developers
- Guidelines for accessibility, grid, localisation and more
- Guidelines for visual assets such as icons and Helsinki logo
- Design token documentation
- Component documentation
- About section with news, release notes and road map
- Resources section
- Contribution guidelines

## Getting started

When making changes to the documentation website, recommended way to get it running locally. This way you can review and see your changes in real time like they would show up in production. 

### Setting up local development environment

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
cd site
yarn start
```

You may need to rerun `yarn build` if you make changes to `doczrc.js` config file or if other HDS packages are updated.

### Writing documentation

The documentation is written as md/mdx files in the `docs/` folder. Docz doesn't care for the subfolders, but for the sake of clarity, the folder structure should mirror the menu hierarchy. Once you create a new markdown file under `docs` it will be added in the documentation automatically (given it's valid of course).

In addition to the markdown, the file contains a frontmatter header that will be used to give the page it's settings (see [Document settings](https://www.docz.site/docs/document-settings)).

[Example page documentation file](examples/page.mdx)

[Example component documentation file](examples/component.mdx)

### App configuration

Docz configuration is handled via the [`doczrc.js`](doczrc.js). Follow the [Project Configuration reference](https://www.docz.site/docs/project-configuration).

### Troubleshooting

* Compiling error when running `yarn start`

    ```
    ERROR #98123 WEBPACK

    Generating development JavaScript bundle failed

    Failed to load config "react-app" to extend from.
    Referenced from: BaseConfig
    
    File: .cache/app.js
    ```
  
    Try running the following in the project root `rm -rf node_modules/ yarn.lock && yarn && yarn build && cd site && yarn start`


* Error after running `yarn start` and opening http://localhost:3000/

    ```
    TypeError: Cannot read property 'find' of undefined
    ```
  
    Make a change to any of the documentation `.mdx` files and refresh the page.
