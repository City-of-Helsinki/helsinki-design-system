import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconSortAlphabeticalDescending = ({
  'aria-label': ariaLabel = 'sort-alphabetical-descending',
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
      d="M16.995 12.96C18.835 12.96 20.275 14.28 20.275 16.52C20.275 18.76 18.835 20.12 16.995 20.12C15.165 20.12 13.725 18.76 13.725 16.52C13.725 14.28 15.165 12.96 16.995 12.96ZM7 3.49999L11.5 7.99999L10 9.49999L8 7.49999V20H6V7.49999L4 9.49999L2.5 7.99999L7 3.49999ZM16.995 14.59C16.015 14.59 15.625 15.46 15.625 16.52C15.625 17.58 16.015 18.49 16.995 18.49C17.975 18.49 18.375 17.58 18.375 16.52C18.375 15.46 17.975 14.59 16.995 14.59ZM15.935 11C16.435 11 16.805 11.36 16.805 11.86C16.805 12.36 16.435 12.72 15.935 12.72C15.435 12.72 15.065 12.36 15.065 11.86C15.065 11.36 15.435 11 15.935 11ZM18.065 11C18.565 11 18.935 11.36 18.935 11.86C18.935 12.36 18.565 12.72 18.065 12.72C17.565 12.72 17.195 12.36 17.195 11.86C17.195 11.36 17.565 11 18.065 11ZM18.135 3.07999L20.465 9.99999H18.545L18.125 8.67999H15.785L15.375 9.99999H13.535L15.865 3.07999H18.135ZM16.985 4.85999H16.945L16.8651 5.21207L16.8068 5.43215L16.735 5.66999L16.265 7.15999H17.655L17.1478 5.55011L17.0845 5.31863L17.018 5.02991L16.985 4.85999Z"
      fill="currentColor"
    />
  </svg>
);
