import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

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
    <path fillRule="evenodd" clipRule="evenodd" d="M13 4V16.4995L17 12.5L18.5 14L12 20.5L5.5 14L7 12.5L11 16.5V4H13Z" fill="currentColor"></path>
  </svg>
);
