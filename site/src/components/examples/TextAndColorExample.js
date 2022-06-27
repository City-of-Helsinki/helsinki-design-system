import React from 'react';
import PropTypes from 'prop-types';
import TextExample from './TextExample';
import ColorExample from './ColorExample';

const TextAndColorExample = ({ color, name }) => (
  <div
    aria-label={name}
    style={{
      alignItems: 'center',
      display: 'flex',
    }}
  >
    <TextExample
      color={color}
      style={{
        marginRight: 'var(--spacing-2-xs)',
      }}
    />
    <ColorExample color={color} />
  </div>
);

TextAndColorExample.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default TextAndColorExample;