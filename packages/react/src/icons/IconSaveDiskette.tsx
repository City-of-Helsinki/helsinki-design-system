import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconSaveDiskette = ({
  'aria-label': ariaLabel = 'save-diskette',
  'aria-hidden': ariaHidden = true,
  className = '',
  color,
  size = IconSize.Small,
  style = {},
  ...rest
}: IconProps) => (
  <svg
    aria-label={ariaLabel}
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
      d="M22 5V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V3C2 2.44772 2.44772 2 3 2H19L22 5ZM18.0083 4L20 6V20H4V4H18.0083ZM17 12H7V14H17V12ZM16 9H8V11H16V9ZM6 4H8V11H6V4ZM5 12H7V20H5V12ZM16 4H18V11H16V4ZM13 5H15V8H13V5ZM17 12H19V20H17V12Z"
      fill="currentColor"
    />
  </svg>
);
