import React from 'react';
import PropTypes from 'prop-types';

const ShadowExample = ({ size, name }) => (
  <div
    aria-label={`Visualized example: ${name}`}
    role="img"
    style={{
      display: 'inline-block',
      width: '40px',
      height: '40px',
      background: `var(--color-fog)`,
      boxShadow: `var(--box-shadow-${size})`,
    }}
  />
);

ShadowExample.propTypes = {
  size: PropTypes.string.isRequired,
  name: PropTypes.string,
};

export default ShadowExample;
