import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconPenLine = ({
  'aria-label': ariaLabel = 'pen-line',
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
      d="M14.25 2.5L3.5 13.25L3.5143 17.9857L8.25 18L19 7.25L14.25 2.5ZM5.5 14L14.25 5.25L16.25 7.25L7.5 16L5.50696 15.994L5.5 14ZM3.5 20H20.5V22H3.5V20Z"
      fill="currentColor"
    />
  </svg>
);
