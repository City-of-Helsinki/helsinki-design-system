import React from 'react';
import PropTypes from 'prop-types';

const ColorExample = ({ color, name }) => (
  <div
    aria-label={name}
    style={{
      display: 'inline-block',
      width: '40px',
      height: '40px',
      background: `${color}`,
    }}
  />
);

ColorExample.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ColorExample;