import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconCalendarCross = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M17,2 C17.5522847,2 18,2.44771525 18,3 L18,4 L22,4 L22,13 L20,13 L20,11 L4,11 L4,19 L13.5,19 L13.5,21 L2,21 L2,4 L6,4 L6,3 C6,2.44771525 6.44771525,2 7,2 C7.55228475,2 8,2.44771525 8,3 L8,4 L16,4 L16,3 C16,2.44771525 16.4477153,2 17,2 Z M20,6 L4,6 L4,9 L20,9 L20,6 Z M22.5355339,16.4142136 L20.5,18.5 L22.5,20.5 L21,22 L19,20 L17,22 L15.4644661,20.6568542 L17.5,18.5 L15.5,16.5 L17,15 L19,17 L21,15 L22.5355339,16.4142136 Z"
      />
    </g>
  </svg>
);
