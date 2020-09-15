# Helsinki Design System documentation site

This is the public documentation site of Helsinki Design System ([hds.hel.fi](https://hds.hel.fi/)). It is built with [docz](https://www.docz.site/) which is powered by [Gatsby](https://www.gatsbyjs.com/). Documentation site includes:

- General introduction of Helsinki Design System
- Getting started section for designers and developers
- Guidelines for accessibility, grid, localisation and more
- Guidelines for visual assets such as icons and Helsinki logo
- Design token documentation
- Component documentation
- About section with news, release notes and road map
- Resources section
- Contribution guidelines

## Getting started

When making changes to the documentation website, recommended way is to get it running locally. This way you can review and see your changes in real time like they would show up in production. 

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

5. Open the browser of your choice (Chrome recommended) and navigate to http://localhost:3000/. You should now see the documentation site.

**Note!** You may need to rerun `yarn build` if you make changes to `doczrc.js` config file or if other HDS packages are updated.

## Writing documentation

The documentation is written as `.mdx` files in the `docs/` folder. To keep things tidy, the folder structure should always mirror the site menu hierarchy.

### General guidelines
- HDS documentation is written in British English.
- The audience of the documentation includes every one at the City of Helsinki organisation with the main focus on developers, designers and product owners. Try to avoid technical jargon to keep documentation understandable for everyone.
- HDS documentation aims to guide designers and developer and not restrict them. Most of the time the last word is left to the user of the design system. Keep this in mind - especially when writing component and token principles.
- Documentation in Components and Design tokens sections always should have their counterpart both in design kit and implementation. HDS aims not to release documentation before implementation is released.
- Documentation site styles take care of most of the accessibility issues. You mostly need to ensure that heading levels are used semantically (refer to [HDS typography documentation](https://hds.hel.fi/design-tokens/typography)) and external links are correctly visualized (you can use the HDS provided [Link component](src/components/Link.js)).

### Using example page templates

HDS offers example page templates for the most common pages such as component and design token documentation. If an example template is available for the page you are writing, it should be used. Example templates include basic title structure and general guidelines for content for each section. Currently available example template pages are (Note that GitHub Markdown viewer does not show file comments. Use raw format or read files with your code editor.):
- [Component page template](examples/component.mdx)
- [Design token page template](examples/design_token.mdx)
- [General page template](examples/page.mdx)

You can use the following command line command to quickly copy example templates to the right folder:
```
cd site/docs/<category_folder>
cp ../../examples/<example_template>.mdx ./<component_name>.mdx
```

### Adding new pages

To add new pages to documentation, simply add a new `.mdx` under the `docs/` folder inside a corresponding menu category. For example, if you are adding documentation for a new component, create a `<component name>.mdx` file to `docs/components/` folder. It is recommended to use example page templates provided in `site/examples/` folder.

All docz pages should include a following frontmatter settings header at the top of the file:
```
---
name: <COMPONENT_NAME>
menu: Components
route: /components/<COMPONENT_NAME>
---
```
`name` specifies the page name shown in the browser. 

`menu` specifies the category page is under in the menu hierarchy. 

`route` specifies the URL format of the page. It should follow the naming of the category the page belongs to.

For full documentation about document settings, refer to [Docz documentation - Document settings](https://www.docz.site/docs/document-settings).

### Adding new categories

Generally new pages will be added to the documentation page automatically without restarting the development server. However, if you are adding a completely new category you need to add it to the `doczrc.js` configuration file and build the site package again. For more info on how to configure docz, refer to [Docz documentation - Project configuration](https://www.docz.site/docs/project-configuration).

## Troubleshooting

**Most compiling errors when running `yarn start`**
  
Try running the following in the project root folder:
`rm -rf node_modules/ yarn.lock && yarn && yarn build && cd site && yarn start`

**Error after running `yarn start` and opening http://localhost:3000/**
```
TypeError: Cannot read property 'find' of undefined
```

Make a change to any of the documentation `.mdx` files and refresh the page. You can also try to clear browser's cache or doing a hard refresh.

**After changes the page renders completely empty or some of the content does not show on the page**

If you have used custom React components inlined (like the Link component), Gatsby does not render those paragraphs correctly. The fix is to wrap the text into paragraph tags. This way Gatsby correctly recognizes and renders React components.
