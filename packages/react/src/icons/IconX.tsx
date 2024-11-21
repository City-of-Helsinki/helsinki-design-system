import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconX = ({
  'aria-label': ariaLabel = 'x',
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
      d="M5 3C4 3 3 4 3 5V19C3 20 4 21 5 21H19C20 21 21 20 21 19V5C21 4 20 3 19 3H5ZM16.9092 7H15.2128L12.4174 10.1954L10.0005 7H6.5L10.6826 12.4692L6.71846 17H8.4159L11.4754 13.5041L14.1492 17H17.5631L13.2031 11.2359L16.9092 7Z"
      fill="currentColor"
    />
    <path d="M14.6174 15.9846H15.5574L9.48974 7.96205H8.48103L14.6174 15.9846Z" fill="currentColor" />
  </svg>
);
