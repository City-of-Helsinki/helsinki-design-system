import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconLinkExternal = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3V19H21V21H3V3H5ZM21 3V12H19V6.413L9.91421 15.5L8.5 14.0858L17.585 5H12V3H21Z"
        fill="currentColor"
      />
    </g>
  </svg>
);
