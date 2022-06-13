import React from 'react';
import { withPrefix } from 'gatsby';
import { Koros } from 'hds-react';
import PropTypes from 'prop-types';

import './Hero.scss';

const Hero = ({ children, backgroundImageUrl, title, text }) => {
  return (
    <div className={`hero`} style={{ backgroundImage: `url(${withPrefix(backgroundImageUrl)})` }}>
      <div className="hero-content">
        <div className="hero-content-text">
          <div className="hero-content-shape" />
          <h1 className="hero-title">{title}</h1>
          <p className="hero-text">{text}</p>
          {children}
        </div>
      </div>
      <Koros className="hero-koros hero-koros-horizontal" flipHorizontal />
      <Koros className="hero-koros hero-koros-rotated" flipHorizontal rotate="45deg" />
    </div>
  );
};

Hero.propTypes = {
  className: PropTypes.string,
  backgroundImageUrl: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
};

export default Hero;
