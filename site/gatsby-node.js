const webpack = require('webpack');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();

  config.plugins.push(
    new webpack.NormalModuleReplacementPlugin(
      /hds-core|hds-react/,
      resource => {
        if (resource.context.includes('.cache/gatsby-source-git/docs-release-2.17.1/site')) {
          resource.request = resource.request.replace('hds-core', 'hds-2-core');
          resource.request = resource.request.replace('hds-react', 'hds-2-react');
        }
        if (resource.context.includes('.cache/gatsby-source-git/docs-release-3.11.0/site')) {
          resource.request = resource.request.replace('hds-core', 'hds-3-core');
          resource.request = resource.request.replace('hds-react', 'hds-3-react');
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
    cache: false,
    optimization: {
      chunkIds: 'deterministic',
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
                gitRemote {
                  ref
                }
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

  // Create pages dynamically
  result.data.allMdx.edges.forEach(({ node }) => {
    const gitRemote = node.parent?.gitRemote?.ref;
    const pathWithVersion = path.join('/', gitRemote || '', node.frontmatter.slug);

    try {
      const pageTemplate = require.resolve('./src/components/ContentLayoutWrapper.js');
      const contentPath = './src/docs/' + node.parent.relativePath.replace('site/src/docs/', '');

      console.log('createPage() ' + gitRemote + ' ' + contentPath);

      const pageContent = gitRemote
        ? require.resolve(`./.cache/gatsby-source-git/docs-${gitRemote}/${node.parent.relativePath}`)
        : require.resolve(contentPath);

      createPage({
        component: `${pageTemplate}?__contentFilePath=${pageContent}`,
        path: pathWithVersion,
        context: {
          id: node.id,
          frontmatter: { ...node.frontmatter, slug: pathWithVersion },
        },
      });
    } catch (e) {
      console.error(e);
    }
  });
};
