const webpack = require('webpack');
const path = require('path');
const {makeRe} = require('micromatch');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.mdx$/,
          use: [
            {
              loader: require.resolve('./modify-mdx-loader.js'),
            },
            // other loaders like mdx-loader, babel-loader, etc.
          ],
        },
      ],
    },
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
      const pageTemplate = require.resolve("./src/components/ContentLayoutWrapper.js");
      const contentPath = "./src/docs/" + node.parent.relativePath.replace('site/src/docs/', '');
      console.log(gitRemote + ' ' + contentPath);
      const pageContent =
        gitRemote
        ? require.resolve(`./.cache/gatsby-source-git/docs-${gitRemote}/${node.parent.relativePath}`)
        : require.resolve(contentPath);

      createPage({
        component: `${pageTemplate}?__contentFilePath=${pageContent}`,
        // prefix older version docs pages with their branch name
        path: path.join("/", gitRemote || "", node.frontmatter.slug),
        context: {
          id: node.id,
          frontmatter: node.frontmatter,
        },
      });
    }
    catch (e) {
      console.log('id', node.id);
      console.log('frontmatter', node.frontmatter);
      console.log('gitRemote', gitRemote);
      console.log('relativePath', node.parent.relativePath);
      console.error(e);
    }
  });
};


