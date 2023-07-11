import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconLockOpen = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M17 2a5 5 0 014.998 4.86L22 7v2h-2V7a3 3 0 00-5.998-.112L14 7v2h2v13H2V9h10V7a5 5 0 015-5zm-3 9H4v9h10v-9zm-4 2v5H8v-5h2z"
        fill="currentColor"
      />
    </g>
  </svg>
);
