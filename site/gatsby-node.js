const webpack = require('webpack');
const path = require('path');
const buildSingleVersion = process.env.BUILD_SINGLE_VERSION === 'true';

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /hds-core|hds-react/,
      resource => {
        if (resource.context.includes('.cache/gatsby-source-git/docs-release-2.')) {
          resource.request = resource.request.replace('hds-core', 'hds-2-core');
          resource.request = resource.request.replace('hds-react', 'hds-2-react');
        }
        if (resource.context.includes('.cache/gatsby-source-git/docs-release-3.')) {
          resource.request = resource.request.replace('hds-core', 'hds-3-core');
          resource.request = resource.request.replace('hds-react', 'hds-3-react');
        }
        if (resource.context.includes('.cache/gatsby-source-git/docs-release-4.')) {
          resource.request = resource.request.replace('hds-core', 'hds-4-core');
          resource.request = resource.request.replace('hds-react', 'hds-4-react');
        }
      }
    )
  );

  actions.setWebpackConfig({
    plugins: [
      // We need to provide a polyfill for react-live library to make it work with the latest Gatsby: https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      ...config.plugins,
    ],
    resolve: {
      alias: {
        fs$: path.resolve(__dirname, 'src/fs.js'),
        '~hds-core': 'hds-2-core',
        'hds-react': 'hds-react/lib',
        stream: false,
      },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
      },
    },
    cache: buildSingleVersion,
    optimization: {
      splitChunks: {
        chunks: 'initial',
        minChunks: 2,
        cacheGroups: {
          default: false,
          vendors: false,
        },
      },
    },
  });
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // GraphQL query to fetch frontmatter and rendered MDX content
  const result = await graphql(`
    query SiteDataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          menuLinks {
            name
            link
            subMenuLinks {
              name
              link
              withDivider
            }
          }
          footerTitle
          footerAriaLabel
        }
      }
      allMdx {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              navTitle
              customLayout
            }
            parent {
              ... on File {
                relativePath
                ${!buildSingleVersion ?
                `   gitRemote {
                      ref
                }` : ``}
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw new Error('Failed to fetch MDX data');
  }

  const splitPathIntoParts = (path) => path.split('/').filter((l) => !!l);

  const isLinkParentForPage = (parentPath, level) => (page) => {
    const pathParts = splitPathIntoParts(page.slug);
    const ret = pathParts.length === level && pathParts.slice(0, -1).every((pathPart) => parentPath.includes(pathPart));
    return ret;
  };

  const sortByPageTitle = (pageA, pageB) => pageA.title.localeCompare(pageB.title);

  const generateUiIdFromPath = (path, prefix) => {
    const pathStr =
      !path && path === '/'
        ? 'home'
        : path
            .split('/')
            .filter((str) => !!str)
            .join('-');
    return `${prefix}-${pathStr}`;
  };

  const resolveCurrentMenuItem = (version, menuItems, slugWithPrefix) => {
    const rootPath = '/';

    if (slugWithPrefix === rootPath) {
      return menuItems.find(({ link }) => link === rootPath);
    } else {
      const ret = menuItems
        .filter(({ link }) => link !== rootPath)
        .find((menuItem) => slugWithPrefix.startsWith(menuItem.link));
      return ret;
    }
  };

  const getUiSubMenuLinks = (allPages, uiMenuLinks, currentMenuItem) => {
    const subMenuLinks = currentMenuItem?.subMenuLinks || [];
    const subMenuLinksFromPages =
      currentMenuItem && currentMenuItem.link
        ? allPages
            .filter(isLinkParentForPage(currentMenuItem.link, 2))
            .map((page) => ({ name: page.title, title: page.title, link: page.slug }))
            .sort(sortByPageTitle)
        : [];

    const uiSubMenuLinks = [...subMenuLinks, ...subMenuLinksFromPages].map((subMenuLink) => ({
      ...subMenuLink,
      prefixedLink: subMenuLink.link,
      uiId: generateUiIdFromPath(subMenuLink.link, 'side-nav'),
      subLevels: allPages
        .filter(isLinkParentForPage(subMenuLink.link, 3))
        .map((subLevelLink) => ({
          ...subLevelLink,
          uiId: generateUiIdFromPath(subLevelLink.slug, 'side-nav-sub'),
          prefixedLink: subLevelLink.slug,
        }))
        .sort(sortByPageTitle),
    }));

    return uiSubMenuLinks;
  }

  const siteData = result.data.site.siteMetadata;
  const mdxPageData = result.data.allMdx?.edges || [];
  const menuLinks = siteData?.menuLinks || [];

  const uiMenuLinks = menuLinks.map((menuLink) => ({
    ...menuLink,
    uiId: generateUiIdFromPath(menuLink.link, 'nav'),
  }));

  // Create pages dynamically
  result.data.allMdx.edges.forEach(({ node }) => {
    const gitRemote = node.parent?.gitRemote?.ref;
    const pathWithVersion = path.join('/', gitRemote || '', node.frontmatter.slug);

    try {
      const pageTemplate = require.resolve('./src/components/ContentLayoutWrapper.js');
      const contentPath = './src/docs/' + node.parent.relativePath.replace('site/src/docs/', '');

      console.log('createPage() ' + (gitRemote ? gitRemote : 'latest') + ' ' + contentPath);

      const pageContent = gitRemote
        ? require.resolve(`./.cache/gatsby-source-git/docs-${gitRemote}/${node.parent.relativePath}`)
        : require.resolve(contentPath);

      // filter out duplicate slug entries.
      const allPages = Object.values(
        Object.fromEntries(
          mdxPageData
            .filter(({ node }) => node?.parent?.gitRemote?.ref === gitRemote)
            .filter(({ node }) => node.frontmatter.slug && node.frontmatter.navTitle)
            .map(({ node }) => [node.frontmatter.slug, { ...node.frontmatter, ...node.fields }])
        ),
      );

      const currentMenuItem = resolveCurrentMenuItem(gitRemote, uiMenuLinks, node.frontmatter.slug);
      const uiSubMenuLinks = getUiSubMenuLinks(allPages, uiMenuLinks, currentMenuItem);

      createPage({
        component: `${pageTemplate}?__contentFilePath=${pageContent}`,
        path: pathWithVersion,
        context: {
          id: node.id,
          frontmatter: { ...node.frontmatter, slug: pathWithVersion },
          siteData,
          currentMenuItem,
          uiMenuLinks,
          uiSubMenuLinks
        },
      });
    } catch (e) {
      console.error(e);
    }
  });
};
