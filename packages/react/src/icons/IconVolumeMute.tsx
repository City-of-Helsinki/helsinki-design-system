import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconVolumeMute = ({
  'aria-label': ariaLabel = 'volume-mute',
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
      d="M15 2.5V21.5L9.273 17H6C3.23858 17 1 14.7614 1 12C1 9.28538 3.16334 7.07603 5.86005 7.00192L9.273 7L15 2.5ZM13 6.8115L10 8.926V15.073L13 17.188V6.8115ZM22.5 8.5L24 10L22 12L24 14L22.5 15.5L20.5 13.5L18.5 15.5L17 14L19 12L17 10L18.5 8.5L20.5 10.5L22.5 8.5ZM8 9L6.02745 8.99981L5.91499 9.00117C4.29498 9.04569 3 10.3746 3 12C3 13.6192 4.28279 14.9388 5.88753 14.9979L6 15H8V9Z"
      fill="currentColor"
    />
  </svg>
);
