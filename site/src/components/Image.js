import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, alt = 'Image', style = {}, ...rest }) => <img alt={alt} src={src} style={style} {...rest} />;

Image.propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    style: PropTypes.object,
};

export default Image;