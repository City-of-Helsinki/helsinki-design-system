import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconArrowDown = ({
  ariaLabel = 'arrow-down',
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
      d="M13.5 4V16.4995L17.5 12.5L19 14L12.5 20.5L6 14L7.5 12.5L11.5 16.5V4H13.5Z"
      fill="currentColor"
    />
  </svg>
);
