import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconDocument = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <rect width="24" height="24" />
      <path
        fill="currentColor"
        d="M15,2 L20,7 L20,22 L4,22 L4,2 L15,2 Z M14,4 L14,8 L18,8 L14,4 Z M14.0082581,4 L18,8 L18,20 L6,20 L6,4 L14.0082581,4 Z M17,16 L7,16 L7,18 L17,18 L17,16 Z M17,12 L7,12 L7,14 L17,14 L17,12 Z M13,8 L7,8 L7,10 L13,10 L13,8 Z"
      />
    </g>
  </svg>
);
