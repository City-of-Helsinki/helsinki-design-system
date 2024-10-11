import React from 'react';
import { StatusLabel as HDSStatusLabel } from 'hds-react';
import PropTypes from 'prop-types';

import { stripParagraphAsFirstChild } from './stripParagraphAsFirstChild';

const StatusLabel = ({ children, ...props }) => {
  return <HDSStatusLabel {...props}>{stripParagraphAsFirstChild(children)}</HDSStatusLabel>;
};

StatusLabel.propTypes = {
  className: PropTypes.string,
  'data-testid': PropTypes.string,
  type: PropTypes.oneOf(['neutral', 'info', 'success', 'alert', 'error']),
  iconStart: PropTypes.node,
};

export default StatusLabel;
