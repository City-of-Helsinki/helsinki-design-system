import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconDocumentBlank = ({
  ariaLabel = 'document-blank',
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
      d="M15 2L20 7V22H4V2H15ZM14 4V8H18L14 4ZM14.0083 4L18 8V20H6V4H14.0083Z"
      fill="currentColor"
    />
  </svg>
);
