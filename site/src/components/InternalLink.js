import React from 'react';
import { Link } from 'hds-react';
import PropTypes from 'prop-types';
import { navigate, withPrefix } from 'gatsby';

import { stripParagraphAsFirstChild } from './stripParagraphAsFirstChild';

const InternalLink = ({ href, children, openInNewTab, openInNewTabLabel, size }) => {
  const openInNewTabProps = openInNewTab
    ? { openInNewTab, openInNewTabLabel: openInNewTabLabel || 'Opens in a new tab.' }
    : {};

  return (
    <Link
      href={withPrefix(href)}
      {...openInNewTabProps}
      size={size}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {stripParagraphAsFirstChild(children)}
    </Link>
  );
};

InternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  openInNewTab: PropTypes.bool,
  openInNewTabLabel: PropTypes.string,
  size: PropTypes.string,
};

export default InternalLink;
