import React from 'react';

import styles from './Icon.module.css';

interface IconProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  className?: string;
  color?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: React.CSSProperties;
}

export const IconPersonFemale = ({
  ariaLabel = 'person-female',
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
      d="M11 18V22H13V18H15V24H9V18H11ZM13.0476 7C14.9713 7 16.1733 8.17451 16.6362 10.0048L18.4695 17.2548L16.5305 17.7452L14.6972 10.4952C14.45 9.51758 13.9877 9.0376 13.15 9.00213L13.0476 9H10.9524C10.0496 9 9.55991 9.47847 9.30282 10.4952L7.46948 17.7452L5.53052 17.2548L7.36385 10.0048C7.81512 8.22027 8.96906 7.05914 10.8095 7.00219L10.9524 7H13.0476ZM12 0C13.6569 0 15 1.34315 15 3C15 4.65685 13.6569 6 12 6C10.3431 6 9 4.65685 9 3C9 1.34315 10.3431 0 12 0ZM12 2C11.4477 2 11 2.44772 11 3C11 3.55228 11.4477 4 12 4C12.5523 4 13 3.55228 13 3C13 2.44772 12.5523 2 12 2Z"
      fill="currentColor"
    />
  </svg>
);
