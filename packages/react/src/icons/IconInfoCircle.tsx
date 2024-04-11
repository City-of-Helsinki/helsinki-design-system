import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconInfoCircle = ({
  ariaLabel = 'info-circle',
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
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM13 10V16.5H15V18H9V16.5H11V11.5H9V10H13ZM11.8125 6C12.5374 6 13.125 6.5876 13.125 7.3125C13.125 8.03735 12.5374 8.625 11.8125 8.625C11.0876 8.625 10.5 8.03735 10.5 7.3125C10.5 6.5876 11.0876 6 11.8125 6Z"
      fill="currentColor"
    />
  </svg>
);
