import React from 'react';
import PropTypes from 'prop-types';

const TextExample = ({ color = 'var(--color-black-90)', size = 'var(--fontsize-heading-m)', style = {}, weight = 400 }) => (
  <span
    style={{
      fontSize: size,
      fontWeight: weight,
      color,
      ...style,
    }}
  >
    Aa
  </span>
);

TextExample.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TextExample;