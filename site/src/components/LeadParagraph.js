import React from 'react';
import PropTypes from 'prop-types';

const LeadParagraph = ({
  color = 'var(--color-black-90)',
  size = 'var(--fontsize-body-xl)',
  style = {},
  children,
}) => (
  <p
    style={{
      fontSize: size,
      color,
      maxWidth: 600,
      ...style,
    }}
  >
    {children}
  </p>
);

LeadParagraph.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

export default LeadParagraph;