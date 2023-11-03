import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconAngleDown = ({
  ariaLabel = 'angle-down',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M12 13.5L17 8.5L18.5 10L12 16.5L5.5 10L7 8.5L12 13.5Z" fill="currentColor"></path>
  </svg>
);
