const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode, basePath: 'docs' });
    const plainSlugParentString = slug.substring(1, slug.length - 1);
    const slugParentsArr = plainSlugParentString.split('/');

    createNodeField({
      node,
      name: 'subDir',
      value: slugParentsArr.length > 2 ? slugParentsArr[1] : null,
    });
  }
};
