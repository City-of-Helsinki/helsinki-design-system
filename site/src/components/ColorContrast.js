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
      display: 'inline-block',
      width: 'var(--spacing-layout-m)',
      height: 'var(--spacing-layout-m)',
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
};

export default ColorContrast;
