import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconCross = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        points="18 7.5 13.5 12 18 16.5 16.5 18 12 13.5 7.5 18 6 16.5 10.5 12 6 7.5 7.5 6 12 10.5 16.5 6"
      />
    </g>
  </svg>
);
