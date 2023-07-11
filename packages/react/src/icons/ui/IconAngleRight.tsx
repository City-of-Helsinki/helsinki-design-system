import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconAngleRight = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <polygon points="0 24 0 0 24 0 24 24" />
      <polygon fill="currentColor" points="13.5 12 8.5 7 10 5.5 16.5 12 10 18.5 8.5 17" />
    </g>
  </svg>
);
