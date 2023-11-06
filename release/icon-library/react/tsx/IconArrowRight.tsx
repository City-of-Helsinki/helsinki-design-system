import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconArrowRight = ({
  ariaLabel = 'arrow-right',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M14 5.5L12.5 7L16.5 11H4V13H16.5L12.5 17L14 18.5L20.5 12L14 5.5Z" fill="currentColor"></path>
  </svg>
);
