import React from 'react';
import PropTypes from 'prop-types';

const LargeParagraph = ({
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

LargeParagraph.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

export default LargeParagraph;
