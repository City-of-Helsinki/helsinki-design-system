import React from "react";
import PropTypes from "prop-types";
import ColorBox from "./ColorBox";

const Colors = ({ colorvar, variations }) => (
  <>
    {variations.map(variation => (
      <ColorBox color={`var(${colorvar}${variation})`} />
    ))}
  </>
);

Colors.propTypes = {
  colorvar: PropTypes.string.isRequired,
  variations: PropTypes.array.isRequired
};

export default Colors;
