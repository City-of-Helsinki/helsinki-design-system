import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconArrowUndo = ({
  'aria-label': ariaLabel = 'arrow-undo',
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
      d="M14 10C16.2091 10 18 11.7909 18 14C18 16.2091 16.2091 18 14 18H10V20H14.0364L14.188 19.9981C17.4131 19.9171 20 17.2611 20 14C20 10.7389 17.4131 8.08285 14.188 8.0019L8.5 8L12 4.5L10.5 3L4.5 9L10.5 15L12 13.5L8.5 10H14Z"
      fill="currentColor"
    />
  </svg>
);
