import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconSignout = ({
  'aria-label': ariaLabel = 'signout',
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
      d="M16 2V7H14V4H5V20H14V17H16V22H3V2H16ZM18 7L23 12L18 17L16.5 15.5L19 12.999L8 13V11L18.999 10.999L16.5 8.5L18 7Z"
      fill="currentColor"
    />
  </svg>
);
