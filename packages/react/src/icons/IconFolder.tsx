import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconFolder = ({
  ariaLabel = 'folder',
  ariaLabelledby,
  ariaHidden = true,
  className = '',
  color,
  size = IconSize.Small,
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
      d="M18 6H17H16H11L9 4H7H6H2V21H22V6H18ZM4 12H20V19H4V12ZM10 8H20V10H4V7.57898V6H8L10 8Z"
      fill="currentColor"
    />
  </svg>
);
