import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconArrowBottomRight = ({
  'aria-label': ariaLabel = 'arrow-bottom-right',
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
      d="M18.0163 17.9986H9.01631V15.9986L14.5703 15.9983L6.00134 7.43054L7.41556 6.01633L16.0163 14.6163V8.99865H18.0163V17.9986Z"
      fill="currentColor"
    />
  </svg>
);
