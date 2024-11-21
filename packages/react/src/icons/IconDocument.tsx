import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconDocument = ({
  'aria-label': ariaLabel = 'document',
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
      d="M15 2L20 7V22H4V2H15ZM14 4V8H18L14 4ZM14.0083 4L18 8V20H6V4H14.0083ZM17 16H7V18H17V16ZM17 12H7V14H17V12ZM13 8H7V10H13V8Z"
      fill="currentColor"
    />
  </svg>
);
