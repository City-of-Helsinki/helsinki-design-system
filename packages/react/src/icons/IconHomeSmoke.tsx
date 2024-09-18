import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconHomeSmoke = ({
  'aria-label': ariaLabel = 'home-smoke',
  'aria-hidden': ariaHidden = true,
  className = '',
  color,
  size = IconSize.Small,
  style = {},
  ...rest
}: IconProps) => (
  <svg
    aria-label={ariaLabel}
    aria-hidden={ariaHidden}
    className={[styles.icon, styles[size], className].filter((e) => e).join(' ')}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    color={color}
    style={style}
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4L23 15L21.5 16.5L20 15V23H4V15L2.5 16.5L1 15L12 4ZM12 7L6 13V21L8.999 20.999L9 14H15L14.999 20.999L18 21V13L12 7ZM13 16H11L10.999 20.999H12.999L13 16ZM20 1C20 1.90099 19.7632 2.40639 19.1667 3.12309L19.0694 3.23809C18.6127 3.771 18.5 3.99007 18.5 4.5C18.5 4.97806 18.599 5.20048 18.9878 5.66552L19.0694 5.76191C19.7043 6.50252 19.9728 6.99991 19.998 7.86094L20 8H18.5C18.5 7.52194 18.401 7.29952 18.0122 6.83448L17.9306 6.73809C17.2623 5.9585 17 5.44841 17 4.5C17 3.59901 17.2368 3.09361 17.8333 2.37691L17.9306 2.26191C18.3588 1.76231 18.4846 1.53854 18.4986 1.09235L18.5 1H20Z"
      fill="currentColor"
    />
  </svg>
);
