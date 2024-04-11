import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconCrossCircleFill = ({
  ariaLabel = 'cross-circle-fill',
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
      d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM15 7.5L16.5 9L13.5 12L16.5 15L15 16.5L12 13.5L9 16.5L7.5 15L10.5 12L7.5 9L9 7.5L12 10.5L15 7.5Z"
      fill="currentColor"
    />
  </svg>
);
