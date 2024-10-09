const webpack = require('webpack');
const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      // We need to provide a polyfill for react-live library to make it work with the latest Gatsby: https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    resolve: {
      alias: {
        fs$: path.resolve(__dirname, 'src/fs.js'),
        'hds-react': 'hds-react/lib',
        stream: false,
      },
      fallback: {
        crypto: require.resolve('crypto-browserify'),
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 10000000,
        maxSize: 0,
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

    try {
      const pageTemplate = require.resolve('./src/components/ContentLayoutWrapper.js');
      const contentPath = './src/docs/' + node.parent.relativePath.replace('site/src/docs/', '');

      console.log('createPage() ' + gitRemote + ' ' + contentPath);

      const pageContent = gitRemote
        ? require.resolve(`./.cache/gatsby-source-git/docs-${gitRemote}/${node.parent.relativePath}`)
        : require.resolve(contentPath);

      const pathWithVersion = path.join('/', gitRemote || '', node.frontmatter.slug);
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
