import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconArrowBottomRight = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        points="18.016 17.999 9.016 17.999 9.016 15.999 14.57 15.998 6.001 7.431 7.416 6.016 16.016 14.616 16.016 8.999 18.016 8.999"
      />
    </g>
  </svg>
);
