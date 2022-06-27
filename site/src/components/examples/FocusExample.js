import React from 'react';
import PropTypes from 'prop-types';

const FocusExample = ({ color, background, style = {}, children }) => (
  <div
    aria-label="Visualized example"
    role="img"
    style={{
      fontSize: 'var(--fontsize-body-l)',
      width: 'var(--spacing-2-xl)',
      height: 'var(--spacing-2-xl)',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      background: `${background}`,
      ...style,
    }}
  >
    <div
      style={{
        width: '60%',
        height: '60%',
        border: '3px solid',
        borderColor: `${color}`,
      }}>
    </div>
  </div>
);

FocusExample.propTypes = {
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default FocusExample;
