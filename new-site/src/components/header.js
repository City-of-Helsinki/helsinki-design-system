import * as React from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'hds-react';

const Header = ({ contentId, className, siteTitle }) => (
  <Navigation
    className={className}
    title={siteTitle}
    menuToggleAriaLabel="menu"
    skipTo={`#${contentId}`}
    skipToContentLabel="Skip to content"
  />
);

Header.propTypes = {
  contentId: PropTypes.string,
  className: PropTypes.string,
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: `Helsinki Design System`,
};

export default Header;
