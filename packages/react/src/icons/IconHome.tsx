import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconHome = ({
  'aria-label': ariaLabel = 'home',
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
      d="M1 13L12 2L23 13L21.5 14.5L20 13V21H4V13L2.5 14.5L1 13ZM12 5L6 11V19L8.999 18.999L9 12H15L14.999 18.999L18 19V11L12 5ZM13 14H11L10.999 18.999H12.999L13 14Z"
      fill="currentColor"
    />
  </svg>
);
