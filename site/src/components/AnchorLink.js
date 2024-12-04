import React from 'react';
import InternalLink from './InternalLink';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';

import { stripParagraphAsFirstChild } from './stripParagraphAsFirstChild';

export const AnchorLink = ({ anchor, children, path }) => {
  const location = useLocation();
  const parsedPath = path || location.path;
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
