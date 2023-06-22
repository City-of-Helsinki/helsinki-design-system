/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

/* import 'hds-core/lib/base.min.css';
import 'hds-core/lib/icons/all.min.css';
import 'hds-core/lib/icons/icon.min.css';
import 'hds-core/lib/components/all.min.css'; */
const React = require('react');
const Layout = require('./src/components/layout').default;

// Wraps every page in a component
exports.wrapPageElement = ({ element, props }) => {
  console.log(props)
  if (props.location.pathname.includes("this-is-hds")) return null
  return <Layout {...props}>{element}</Layout>;
};
