import React from 'react';
import { Link } from 'hds-react';
import PropTypes from 'prop-types';

const ExternalLink = ({ href, children, openInNewTab }) => {
  const openInNewTabProps = openInNewTab ? { openInNewTab, openInNewTabAriaLabel: 'Opens in a new tab.' } : {};

  return (
    <Link href={href} openInExternalDomainAriaLabel="Opens a different website." external {...openInNewTabProps}>
      {children}
    </Link>
  );
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  openInNewTab: PropTypes.bool,
};

export default ExternalLink;
