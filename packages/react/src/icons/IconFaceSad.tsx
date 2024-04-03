import React from 'react';

import styles from './Icon.module.css';
import { IconProps } from './Icon.interface';

export const IconFaceSad = ({
  ariaLabel = 'face-sad',
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
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12.0054 13C14.0162 13 15.8308 14.0998 16.7845 15.8221L16.8948 16.0317L15.1052 16.9246L15.0426 16.805C14.4388 15.7027 13.2846 15 12.0054 15C10.7439 15 9.60422 15.6835 8.99396 16.7588L8.89722 16.9416L7.10278 16.0584L7.17312 15.9204C8.11104 14.1424 9.95612 13 12.0054 13ZM8.5 8C9.32843 8 10 8.67157 10 9.5C10 10.3284 9.32843 11 8.5 11C7.67157 11 7 10.3284 7 9.5C7 8.67157 7.67157 8 8.5 8ZM15.5 8C16.3284 8 17 8.67157 17 9.5C17 10.3284 16.3284 11 15.5 11C14.6716 11 14 10.3284 14 9.5C14 8.67157 14.6716 8 15.5 8Z"
      fill="currentColor"
    />
  </svg>
);
