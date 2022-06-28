import React from 'react';
import { Link } from 'hds-react';
import PropTypes from 'prop-types';

const ExternalLink = ({ href, children, className }) => {
  return (
    <Link href={href} className={className} openInExternalDomainAriaLabel="Opens a different website" external>
      {children}
    </Link>
  );
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ExternalLink;
