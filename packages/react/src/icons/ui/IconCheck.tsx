import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconCheck = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
      <polygon fill="currentColor" points="21 7 10 18 4.5 12.5 6 11 10 15 19.5 5.5" />
    </g>
  </svg>
);
