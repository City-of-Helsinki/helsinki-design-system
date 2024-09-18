import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconLayers = ({
  'aria-label': ariaLabel = 'layers',
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
      d="M19 14.5L21 15.5L12 20L3 15.5L5 14.5L12.0005 18L19 14.5ZM19 11L21 12L12 16.5L3 12L5 11L12.0005 14.5L19 11ZM12 4L21 8.5L12 13L3 8.5L12 4ZM12.0005 6L7 8.50052L12.0005 11L17 8.50052L12.0005 6Z"
      fill="currentColor"
    />
  </svg>
);
