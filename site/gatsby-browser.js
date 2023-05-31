/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

/* import 'hds-core/lib/base.min.css';
import 'hds-core/lib/icons/all.min.css';
import 'hds-core/lib/icons/icon.min.css';
import 'hds-core/lib/components/all.min.css'; */
const React = require("react")
const Layout = require("./src/components/layout").default

exports.wrapPageElement = ({ element, props }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return <Layout {...props}>{element}</Layout>
  }