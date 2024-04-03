import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconCheck = ({
  ariaLabel = 'check',
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
      d="M21 7L10 18L4.5 12.5L6 11L10 15L19.5 5.5L21 7Z"
      fill="currentColor"
    />
  </svg>
);
