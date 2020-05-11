import React from 'react';
import PropTypes from 'prop-types';

const Spacing = ({ size, style = {} }) => (
  <span
    style={{
      backgroundColor: 'var(--color-fog)',
      display: 'block',
      height: size,
      width: size,
      ...style,
    }}
  />
);

Spacing.propTypes = {
  size: PropTypes.string,
  style: PropTypes.object,
};

export default Spacing;
