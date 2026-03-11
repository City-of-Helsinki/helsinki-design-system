import React from 'react';
import { Link } from 'hds-react';
import PropTypes from 'prop-types';

import { stripParagraphAsFirstChild } from './stripParagraphAsFirstChild';

const ExternalLink = ({ href, children, openInNewTab, openInNewTabLabel, openInExternalDomainAriaLabel, size }) => {
  const openInNewTabProps = openInNewTab
    ? { openInNewTab, openInNewTabLabel: openInNewTabLabel || 'Opens in a new tab.' }
    : {};

  return (
    <Link
      href={href}
      openInExternalDomainAriaLabel={openInExternalDomainAriaLabel || 'Opens a different website.'}
      external
      {...openInNewTabProps}
      size={size}
    >
      {stripParagraphAsFirstChild(children)}
    </Link>
  );
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  openInNewTab: PropTypes.bool,
  openInNewTabLabel: PropTypes.string,
  openInExternalDomainAriaLabel: PropTypes.string,
  size: PropTypes.string,
};

export default ExternalLink;
