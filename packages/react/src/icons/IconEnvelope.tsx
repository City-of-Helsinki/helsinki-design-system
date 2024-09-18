import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconEnvelope = ({
  'aria-label': ariaLabel = 'envelope',
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
      d="M22 4V20H2V4H22ZM14.138 13.436L12 15.338L9.86 13.436L4.536 18H19.463L14.138 13.436ZM20 8.226L15.647 12.095L20 15.826V8.226ZM4 8.227V15.825L8.352 12.095L4 8.227ZM19.493 6H4.505L12 12.661L19.493 6Z"
      fill="currentColor"
    />
  </svg>
);
