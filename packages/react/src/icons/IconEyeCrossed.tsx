import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconEyeCrossed = ({
  'aria-label': ariaLabel = 'eye-crossed',
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
      d="M19.7929 2.79291L21.2071 4.20712L4.70711 20.7071L3.29289 19.2929L19.7929 2.79291ZM19.6465 7.88777C20.8055 8.9897 21.9234 10.3604 23 12C19.7168 17 16.0501 19.5 12 19.5C10.8495 19.5 9.73001 19.2983 8.64142 18.8948L10.2433 17.2931C10.7683 17.4185 11.2982 17.4865 11.8331 17.4982L12 17.5C14.9515 17.5 17.7504 15.7963 20.4247 12.1976L20.5695 12L20.4247 11.8025C19.7033 10.8317 18.9728 9.99883 18.2328 9.3001L19.6465 7.88777ZM12 4.50001C13.1505 4.50001 14.27 4.70174 15.3586 5.10519L13.7577 6.70716C13.2323 6.58159 12.7021 6.51353 12.1669 6.50184L12 6.50001C9.04854 6.50001 6.2496 8.20374 3.57529 11.8025L3.43 12L3.57529 12.1976C4.29669 13.1683 5.02715 14.0012 5.76723 14.6999L4.35355 16.1123C3.19447 15.0103 2.07662 13.6396 1 12C4.28325 7.00001 7.94991 4.50001 12 4.50001ZM15.976 11.5592C15.9919 11.7039 16 11.851 16 12C16 14.2092 14.2091 16 12 16C11.851 16 11.7039 15.9919 11.5592 15.976L15.976 11.5592ZM12 8.00001C12.149 8.00001 12.2961 8.00816 12.4408 8.02403L8.02402 12.4409C8.00815 12.2961 8 12.149 8 12C8 9.79088 9.79086 8.00001 12 8.00001Z"
      fill="currentColor"
    />
  </svg>
);
