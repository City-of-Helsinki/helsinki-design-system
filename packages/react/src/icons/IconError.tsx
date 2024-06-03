import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconError = ({
  ariaLabel = 'error',
  ariaLabelledby,
  ariaHidden = true,
  className = '',
  color,
  size = IconSize.Small,
  style = {},
}: React.SVGProps<SVGSVGElement> & IconProps) => (
  <svg
    className={[styles.icon, styles[size], className].filter((e) => e).join(' ')}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    aria-hidden={ariaHidden}
    color={color}
    style={style}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1284 2.50974C11.4971 1.85436 12.4201 1.83095 12.8284 2.43952L12.8716 2.50974L22.4341 19.5097C22.7965 20.1541 22.3585 20.9453 21.638 20.9973L21.5625 21H2.43749C1.69816 21 1.22338 20.2303 1.53125 19.5769L1.56592 19.5097L11.1284 2.50974ZM12 5.04L4.14699 19H19.8525L12 5.04ZM13 16V18H11V16H13ZM13 9.5V14.5H11V9.5H13Z"
      fill="currentColor"
    />
  </svg>
);
