import React from 'react';
import { Link } from 'hds-react';
import PropTypes from 'prop-types';
import { navigate, withPrefix } from 'gatsby';

const InternalLink = ({ href, children, openInNewTab, openInNewTabAriaLabel, size }) => {
  const openInNewTabProps = openInNewTab
    ? { openInNewTab, openInNewTabAriaLabel: openInNewTabAriaLabel || 'Opens in a new tab.' }
    : {};

  return (
    <Link
      href={withPrefix(href)}
      {...openInNewTabProps}
      size={size}
      onClick={(event) => {
        event.preventDefault();
        navigate(withPrefix(href));
      }}
    >
      {children}
    </Link>
  );
};

InternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  openInNewTab: PropTypes.bool,
  openInNewTabAriaLabel: PropTypes.string,
  size: PropTypes.string,
};

export default InternalLink;
