import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconSortDescending = ({
  'aria-label': ariaLabel = 'sort-descending',
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
      d="M5 3.5L9.5 8L8 9.5L6 7.5V20H4V7.5L2 9.5L0.5 8L5 3.5ZM23 17V19H11V17H23ZM21 13V15H11V13H21ZM19 9V11H11V9H19ZM16 5V7H11V5H16Z"
      fill="currentColor"
    />
  </svg>
);
