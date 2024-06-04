import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconErrorFill = ({
  ariaLabel = 'error-fill',
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
      d="M11.175 3.45608C11.5239 2.86969 12.3977 2.84875 12.7842 3.39325L12.825 3.45608L21.8771 18.6666C22.2202 19.2432 21.8055 19.951 21.1235 19.9976L21.052 20H2.94799C2.24813 20 1.7987 19.3114 2.09013 18.7267L2.12295 18.6666L11.175 3.45608ZM13 16V18H11V16H13ZM13 8.5V14.5H11V8.5H13Z"
      fill="currentColor"
    />
  </svg>
);
