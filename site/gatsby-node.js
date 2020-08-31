exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        'hds-react': 'hds-react/lib',
      },
    },
  });
};
