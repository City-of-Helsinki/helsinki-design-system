import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconGraphColumns = ({
  ariaLabel = 'graph-columns',
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
      d="M15.8571 9.33333L21 9.33333L21 20L15.8571 20L15.8571 9.33333ZM9.42857 4L14.5714 4L14.5714 20L9.42857 20L9.42857 4ZM3 12L8.14286 12L8.14286 20L3 20L3 12Z"
      fill="currentColor"
    />
  </svg>
);
