import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconArrowBottomRight = ({
  ariaLabel = 'arrow-bottom-right',
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
      d="M18.0163 17.9986H9.01631V15.9986L14.5703 15.9983L6.00134 7.43054L7.41556 6.01633L16.0163 14.6163V8.99865H18.0163V17.9986Z"
      fill="currentColor"
    />
  </svg>
);
