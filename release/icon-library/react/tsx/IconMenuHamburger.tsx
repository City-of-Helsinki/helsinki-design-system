import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconMenuHamburger = ({
  ariaLabel = 'menu-hamburger',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M22 17V19H2V17H22ZM22 11V13H2V11H22ZM22 5V7H2V5H22Z" fill="currentColor"></path>
  </svg>
);
