import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconFolderGroup = ({
  ariaLabel = 'folder-group',
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
      d="M24 3H15L13 1H6V16H24V3ZM8 9H22V14H8V9ZM14 5H22V7H8V3H12L14 5Z"
      fill="currentColor"
    />
    <path d="M3 19H21V17H5V4H3V19Z" fill="currentColor" />
    <path d="M0 22H18V20H2V7H0V22Z" fill="currentColor" />
  </svg>
);
