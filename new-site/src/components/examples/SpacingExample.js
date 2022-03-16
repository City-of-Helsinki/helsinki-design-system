import React from 'react';
import PropTypes from 'prop-types';

const SpacingExample = ({ size, style = {} }) => (
  <span
    aria-label="Visualized example"
    role="img"
    style={{
      backgroundColor: 'var(--color-black-50)',
      display: 'block',
      height: size,
      width: size,
      ...style,
    }}
  />
);

SpacingExample.propTypes = {
  size: PropTypes.string,
  style: PropTypes.object,
};

export default SpacingExample;
