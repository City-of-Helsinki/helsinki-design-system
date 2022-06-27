import React from 'react';
import { withPrefix } from 'gatsby';
import PropTypes from 'prop-types';

import './Image.scss';

const Image = ({ src, alt = 'Image', style = {}, viewable, ...rest }) => {
  const image = <img className="image-container-image" alt={alt} src={withPrefix(src)} style={style} {...rest} />;

  return (
    <div className="image-container">
      {viewable ? (
        <a className="image-container-link" href={withPrefix(src)} title={alt} style={style}>
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  );
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  style: PropTypes.object,
  viewable: PropTypes.bool,
};

export default Image;
