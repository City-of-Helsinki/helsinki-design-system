import React from "react";
import PropTypes from "prop-types";

const ColorBox = ({ color }) => (
  <div
    style={{
      display: "inline-block",
      width: "40px",
      height: "40px",
      background: `${color}`
    }}
  />
);

ColorBox.propTypes = {
  color: PropTypes.string.isRequired
};

export default ColorBox;
