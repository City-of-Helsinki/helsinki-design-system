import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconSort = ({
  'aria-hidden': ariaHidden = true,
  className = '',
  color,
  size = IconSize.Small,
  style = {},
  ...rest
}: IconProps) => (
  <svg
    aria-hidden={ariaHidden}
    className={[styles.icon, styles[size], className].filter((e) => e).join(' ')}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    color={color}
    style={style}
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 14.5L16.5 16L12 20.5L7.5 16L9 14.5L12 17.5L15 14.5ZM12 3.5L16.5 8L15 9.5L12 6.5L9 9.5L7.5 8L12 3.5Z"
      fill="currentColor"
    />
  </svg>
);
