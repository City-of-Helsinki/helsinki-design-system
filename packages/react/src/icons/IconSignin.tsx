import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconSignin = ({
  'aria-label': ariaLabel = 'signin',
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
      d="M21 2V22H8V17H10V20H19V4H10V7H8V2H21ZM12.5 7L17.5 12L12.5 17L11 15.5L13.5 12.999L2 13V11L13.499 10.999L11 8.5L12.5 7Z"
      fill="currentColor"
    />
  </svg>
);
