import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconBox = ({
  'aria-label': ariaLabel = 'box',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M20 7V21H4V7H20ZM18 9V19H6V9H18Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M2 3H22V9H2V3ZM4 5V7H20V5H4Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M9 11V13H15V11H9Z" fill="currentColor" />
  </svg>
);
