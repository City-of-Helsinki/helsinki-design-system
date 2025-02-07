import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconUpload = ({
  'aria-label': ariaLabel = 'upload',
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
      d="M12 1.63605L17.6569 7.2929L16.2426 8.70712L13 5.46505V18H11V5.46505L7.75736 8.70712L6.34315 7.2929L12 1.63605ZM5 15V20H19V15H21V22H3V15H5Z"
      fill="currentColor"
    />
  </svg>
);
