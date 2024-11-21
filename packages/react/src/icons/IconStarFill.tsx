import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconStarFill = ({
  'aria-label': ariaLabel = 'star-fill',
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
      d="M5.20198 22.2312L5.41934 20.5028L6.15589 14.6557L2.18333 10.3775L1 9.11495L2.69047 8.78397L8.40175 7.70525L11.1789 2.53228L12 1L12.8211 2.53228L15.5982 7.70525L21.3095 8.78397L23 9.11495L21.8167 10.3775L17.832 14.6679L18.5686 20.5028L18.798 22.2312L17.2404 21.4835L12 18.9705L6.75961 21.4835L5.20198 22.2312H5.20198Z"
      fill="currentColor"
    />
  </svg>
);
