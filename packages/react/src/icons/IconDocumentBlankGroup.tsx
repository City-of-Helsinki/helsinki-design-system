import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconDocumentBlankGroup = ({
  ariaLabel = 'document-blank-group',
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
      d="M18 1L22 4.00001L22 18H8V1H18ZM17 3V6H20L17 3ZM17 3L20 6L20 16H10V3H17Z"
      fill="currentColor"
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M7 4H5V21H19V19H7V4Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M4 7H2V24H16V22H4V7Z" fill="currentColor" />
  </svg>
);
