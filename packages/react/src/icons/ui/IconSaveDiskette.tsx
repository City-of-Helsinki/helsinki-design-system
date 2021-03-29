import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconSaveDiskette = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M22,5 L22,21 C22,21.5522847 21.5522847,22 21,22 L3,22 C2.44771525,22 2,21.5522847 2,21 L2,3 C2,2.44771525 2.44771525,2 3,2 L19,2 L19,2 L22,5 Z M18.0082581,4 L20,6 L20,20 L4,20 L4,4 L18.0082581,4 Z M17,12 L7,12 L7,14 L17,14 L17,12 Z M16,9 L8,9 L8,11 L16,11 L16,9 Z M6,4 L8,4 L8,11 L6,11 L6,4 Z M5,12 L7,12 L7,20 L5,20 L5,12 Z M16,4 L18,4 L18,11 L16,11 L16,4 Z M13,5 L15,5 L15,8 L13,8 L13,5 Z M17,12 L19,12 L19,20 L17,20 L17,12 Z"
      />
    </g>
  </svg>
);
