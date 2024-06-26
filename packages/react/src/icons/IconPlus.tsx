import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconPlus = ({
  ariaLabel = 'plus',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M13 6V11H18V13H13V18H11V13H6V11H11V6H13Z" fill="currentColor" />
  </svg>
);
