import React from 'react';
import { withPrefix } from 'gatsby'
import PropTypes from 'prop-types';

const Image = ({ src, alt = 'Image', style = {}, viewable, ...rest }) => {
  const image = (
    <img
      alt={alt}
      src={withPrefix(src)}
      style={{
        maxWidth: '100%',
        ...style,
      }}
      {...rest}
    />
  );

  return viewable ? (
    <a href={src} title={alt}>
      {image}
    </a>
  ) : (
    image
  );
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  viewable: PropTypes.bool,
};

export default Image;
