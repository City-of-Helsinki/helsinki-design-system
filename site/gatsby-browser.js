/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

const React = require('react');
const Layout = require('./src/components/layout').default;

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
  if (props.location.pathname.includes('this-is-hds')) return <React.Fragment {...props}>{element}</React.Fragment>;
  return <Layout {...props}>{element}</Layout>;
};
