import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";
import ColorBox from "./ColorBox";

const Example = ({ color }) => (
  <div
    style={{
      alignItems: "center",
      display: "flex"
    }}
  >
    <Text
      color={color}
      style={{
        marginRight: 10
      }}
    />
    <ColorBox color={color} />
  </div>
);

Example.propTypes = {
  color: PropTypes.string.isRequired
};

export default Example;
