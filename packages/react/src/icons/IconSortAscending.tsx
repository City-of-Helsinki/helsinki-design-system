import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconSortAscending = ({
  ariaLabel = 'sort-ascending',
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
      d="M6 4V16.5L8 14.5L9.5 16L5 20.5L0.5 16L2 14.5L4 16.5V4H6ZM23 17V19H11V17H23ZM21 13V15H11V13H21ZM19 9V11H11V9H19ZM16 5V7H11V5H16Z"
      fill="currentColor"
    />
  </svg>
);
