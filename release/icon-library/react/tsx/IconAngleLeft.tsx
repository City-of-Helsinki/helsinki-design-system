import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconAngleLeft = ({
  ariaLabel = 'angle-left',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M10.5 12L15.5 17L14 18.5L7.5 12L14 5.5L15.5 7L10.5 12Z" fill="currentColor"></path>
  </svg>
);
