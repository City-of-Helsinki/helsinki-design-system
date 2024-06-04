import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconTextItalic = ({
  ariaLabel = 'text-italic',
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
      d="M16 4V6H13.75L12.25 18H14V20H8V18H10.25L11.75 6H10V4H16Z"
      fill="currentColor"
    />
  </svg>
);
