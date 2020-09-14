import React from 'react';
import PropTypes from 'prop-types';

const ColorContrast = ({ 
  color, 
  background, 
  style = {},
  children
}) => (
  <div
    style={{
      width: 'var(--spacing-xl)',
      height: 'var(--spacing-xl)',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      background: `${background}`,
      color: `${color}`,
      ...style,
    }}
  >
      {children}
  </div>
);

ColorContrast.propTypes = {
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default ColorContrast;
