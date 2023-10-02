import React from 'react';
import PropTypes from 'prop-types';

const FocusColorExample = ({ color, background, style = {}, contentStyle = {}, children }) => (
  <div
    aria-label="Visualized focus example"
    role="img"
    style={{
      fontSize: 'var(--fontsize-body-l)',
      alignItems: 'center',
      justifyContent: 'flex-start',
      display: 'flex',
      background: `${background}`,
      ...style,
    }}
  >
    <div
      style={{
        border: '3px solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0.25rem',
        borderColor: `${color}`,
        ...contentStyle,
      }}>
      {children && children}  
    </div>
  </div>
);

FocusColorExample.propTypes = {
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default FocusColorExample;
