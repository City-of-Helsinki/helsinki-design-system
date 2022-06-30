import React from 'react';
import { Link } from 'hds-react';
import PropTypes from 'prop-types';

const ExternalLink = ({ href, children, openInNewTab, size }) => {
  const openInNewTabProps = openInNewTab ? { openInNewTab, openInNewTabAriaLabel: 'Opens in a new tab.' } : {};

  return (
    <Link
      href={href}
      openInExternalDomainAriaLabel="Opens a different website."
      external
      {...openInNewTabProps}
      size={size}
    >
      {children}
    </Link>
  );
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  openInNewTab: PropTypes.bool,
  size: PropTypes.string,
};

export default ExternalLink;
