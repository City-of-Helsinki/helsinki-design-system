import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconOccupation = ({
  ariaLabel = 'occupation',
  ariaLabelledby,
  ariaHidden = true,
  className = '',
  color,
  size = 's',
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
      d="M6 2C6 0.89543 6.89543 0 8 0H16C17.1046 0 18 0.89543 18 2V4H16V2H8V4H6V2ZM22 4C23.1046 4 24 4.89543 24 6V22C24 23.1046 23.1046 24 22 24H2C0.895429 24 0 23.1046 0 22V6C0 4.89543 0.89543 4 2 4H22ZM22 12.427L12.6835 15.8155C12.242 15.9761 11.7581 15.9761 11.3166 15.8155L2 12.428V22H22V12.427ZM22 6H2V10.2996L12 13.9359L22 10.2996V6ZM12 10C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12C11.4477 12 11 11.5523 11 11C11 10.4477 11.4477 10 12 10Z"
      fill="currentColor"
    />
  </svg>
);
