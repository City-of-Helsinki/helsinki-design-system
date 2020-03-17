import React from "react";
import PropTypes from "prop-types";
import ColorBox from "./ColorBox";

const Colors = ({ colorvar, variations }) => (
  <>
    {variations.map(variation => {
      const key = `var(${colorvar}${variation})`;
      return <ColorBox key={key} color={key} />;
    })}
  </>
);

Colors.propTypes = {
  colorvar: PropTypes.string.isRequired,
  variations: PropTypes.array.isRequired
};

export default Colors;
