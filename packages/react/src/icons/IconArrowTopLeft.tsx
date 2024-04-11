import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconArrowTopLeft = ({
  ariaLabel = 'arrow-top-left',
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
      d="M6.0177 6V15H8.0177L8.01802 9.446L16.5858 18.015L18 16.6008L9.40002 8H15.0177V6H6.0177Z"
      fill="currentColor"
    />
  </svg>
);
