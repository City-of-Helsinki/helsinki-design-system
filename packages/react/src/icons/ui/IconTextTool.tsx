import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconTextTool = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M8,20 L8,18 L11,18 L11,6 L6,6 L6,8 L4,8 L4,4 L20,4 L20,8 L18,8 L18,6 L13,6 L13,18 L16,18 L16,20 L8,20 Z"
      />
    </g>
  </svg>
);
