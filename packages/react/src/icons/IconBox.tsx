import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconBox = ({
  ariaLabel = 'box',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M20 7V21H4V7H20ZM18 9V19H6V9H18Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M2 3H22V9H2V3ZM4 5V7H20V5H4Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M9 11V13H15V11H9Z" fill="currentColor" />
  </svg>
);
