// modify-mdx-loader.js
module.exports = function (source) {
  if (this.resourcePath.endsWith('tabs.mdx')) {
    // Add the export statement to the content of tabs.mdx
    return `${source}\n\nexport default (props) => <><PageTabs pageContext={props.pageContext}>{props.children}</PageTabs></>;`;
  }
  return source;
};
