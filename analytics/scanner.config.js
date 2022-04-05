module.exports = {
  crawlFrom: './tmp',
  importedFrom: 'hds-react',
  exclude: (dirname) => dirname === 'node_modules',
  processors: ['count-components', 'count-components-and-props'],
};
