import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconAngleRight = ({
  ariaLabel = 'angle-right',
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
      d="M13.5 12L8.5 7L10 5.5L16.5 12L10 18.5L8.5 17L13.5 12Z"
      fill="currentColor"
    />
  </svg>
);
