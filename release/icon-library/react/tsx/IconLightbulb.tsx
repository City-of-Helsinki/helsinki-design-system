import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconLightbulb = ({
  ariaLabel = 'lightbulb',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M4 9C4 11.5264 5.17107 13.7793 7 15.2454L8 16H16L17 15.2454C18.8289 13.7793 20 11.5264 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9ZM15.7477 13.5C17.1207 12.4425 18 10.8958 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 10.8958 6.87929 12.4425 8.2523 13.5H15.7477Z" fill="currentColor"></path>
<path d="M16 17V19H8V17H16Z" fill="currentColor"></path>
<path d="M15.5 20V22H8.5V20H15.5Z" fill="currentColor"></path>
  </svg>
);
