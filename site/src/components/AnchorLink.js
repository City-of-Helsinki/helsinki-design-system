import React from 'react';
import InternalLink from './InternalLink';
import PropTypes from 'prop-types';

import { stripParagraphAsFirstChild } from './stripParagraphAsFirstChild';

export const AnchorLink = ({ anchor, children, path }) => {
  const parsedPath =
    path || (typeof window !== 'undefined' ? window.location.pathname : '');
  const parsedAnchor = String(anchor || children)
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]/g, '');
  return (
    <InternalLink href={`${parsedPath || ''}#${parsedAnchor}`}>{stripParagraphAsFirstChild(children)}</InternalLink>
  );
};

AnchorLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  path: PropTypes.string,
};

export default AnchorLink;
