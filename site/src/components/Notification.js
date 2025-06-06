import React from 'react';
import { Notification as HDSNotification } from 'hds-react';
import PropTypes from 'prop-types';

import { stripParagraphAsFirstChild } from './stripParagraphAsFirstChild';

const Notification = ({ children, ...props }) => {
  return <HDSNotification {...props}>{stripParagraphAsFirstChild(children)}</HDSNotification>;
};

// listed only used props
Notification.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  link: PropTypes.string,
  linkText: PropTypes.string,
  size: PropTypes.oneOf(['default', 'small' , 'large']),
};

export default Notification;