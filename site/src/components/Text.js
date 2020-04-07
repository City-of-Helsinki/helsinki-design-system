import React from "react";
import PropTypes from "prop-types";

// todo: use new vars
const Text = ({
  color = "var(--hds-color-ui-black-90)",
  size = "1.85rem",
  style = {},
  weight = 400
}) => (
  <span
    style={{
      fontSize: size,
      fontWeight: weight,
      color,
      ...style
    }}
  >
    Aa
  </span>
);

Text.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default Text;
