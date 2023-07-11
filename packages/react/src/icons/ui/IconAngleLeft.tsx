import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconAngleLeft = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <polygon points="24 0 24 24 0 24 0 0" />
      <polygon fill="currentColor" points="10.5 12 15.5 17 14 18.5 7.5 12 14 5.5 15.5 7" />
    </g>
  </svg>
);
