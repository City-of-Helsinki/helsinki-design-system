import * as React from "react"
import PropTypes from "prop-types"
import { Navigation } from 'hds-react';

const Header = ({ siteTitle }) => (
  <Navigation
    title={siteTitle}
    menuToggleAriaLabel="menu"
    skipTo="#content"
    skipToContentLabel="Skip to content"
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: `Helsinki Design System`,
}

export default Header
