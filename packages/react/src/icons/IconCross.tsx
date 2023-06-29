import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconCross = ({
  ariaLabel = 'cross',
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
      d="M18 7.5L13.5 12L18 16.5L16.5 18L12 13.5L7.5 18L6 16.5L10.5 12L6 7.5L7.5 6L12 10.5L16.5 6L18 7.5Z"
      fill="currentColor"
    />
  </svg>
);
