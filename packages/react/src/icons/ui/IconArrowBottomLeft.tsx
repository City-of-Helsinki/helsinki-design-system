import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconArrowBottomLeft = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
      <polygon
        fill="currentColor"
        points="6.001 17.999 15.001 17.999 15.001 15.999 9.447 15.998 18.016 7.431 16.602 6.016 8.001 14.616 8.001 8.999 6.001 8.999"
      />
    </g>
  </svg>
);
