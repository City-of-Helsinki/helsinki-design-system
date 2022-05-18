import React from 'react';
import { withPrefix } from 'gatsby';
import PropTypes from 'prop-types';

import './Image.scss';

const Image = ({ src, alt = 'Image', style = {}, viewable, ...rest }) => {
  const image = (
    <div className="image-container">
      <img className="image-container-image" alt={alt} src={withPrefix(src)} {...rest} />
    </div>
  );

  return viewable ? (
    <a href={withPrefix(src)} title={alt}>
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
