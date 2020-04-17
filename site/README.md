# Helsinki Design System documentation site

Built with [docz](https://www.docz.site/).

## Getting started

### Run the dev env

```
# Clone the repo
git clone https://github.com/City-of-Helsinki/helsinki-design-system.git
cd helsinki-design-system/site

# Install dependencies
yarn

# Start dev server, watch for changes
yarn start
```

With your dev server up, you can access the documentation at http://localhost:3000/ start writing your documentation.

### Writing documentation

The documentation is written as md/mdx files in the `docs/` folder. Docz doesn't care for the subfolders, but for the sake of clarity, the folder structure should mirror the menu hierarchy. Once you create a new markdown file under `docs` it will be added in the documentation automatically (given it's valid of course).

In addition to the markdown, the file contains a frontmatter header that will be used to give the page it's settings (see [Document settings](https://www.docz.site/docs/document-settings)).

[Example page documentation file](examples/page.mdx)
[Example component documentation file](examples/component.mdx)

### Deployment

```
# generate static site
yarn build
```

If everything goes well, you'll find the static site at `public/`.

### App configuration

Docz configuration is handled via the [`doczrc.js`](doczrc.js). Follow the [Project Configuration reference](https://www.docz.site/docs/project-configuration).
