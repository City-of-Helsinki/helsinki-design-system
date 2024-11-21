import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconCollapse = ({
  'aria-label': ariaLabel = 'collapse',
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
    <path d="M17.5 2L12.5 7L7.5 2L6 3.5L12.5 10L19 3.5L17.5 2Z" fill="currentColor" />
    <path d="M17.5 22L12.5 17L7.5 22L6 20.5L12.5 14L19 20.5L17.5 22Z" fill="currentColor" />
  </svg>
);
