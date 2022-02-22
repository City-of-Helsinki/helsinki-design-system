import React from 'react';
import PropTypes from 'prop-types';

const ContrastExample = ({ color, background, style = {}, children }) => (
  <div
    style={{
      fontSize: 'var(--fontsize-body-l)',
      width: 'var(--spacing-2-xl)',
      height: 'var(--spacing-2-xl)',
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

ContrastExample.propTypes = {
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default ContrastExample;
