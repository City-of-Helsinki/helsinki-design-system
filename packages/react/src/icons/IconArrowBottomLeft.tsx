import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconArrowBottomLeft = ({
  'aria-label': ariaLabel = 'arrow-bottom-left',
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
      d="M6.00134 17.9986H15.0013V15.9986L9.44734 15.9983L18.0163 7.43054L16.6021 6.01633L8.00134 14.6163V8.99865H6.00134V17.9986Z"
      fill="currentColor"
    />
  </svg>
);
