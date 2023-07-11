import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconArrowRight = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        points="10.5 5.5 12 7 8 11 20.5 11 20.5 13 8 13 12 17 10.5 18.5 4 12"
        transform="matrix(-1 0 0 1 24.5 0)"
      />
    </g>
  </svg>
);
