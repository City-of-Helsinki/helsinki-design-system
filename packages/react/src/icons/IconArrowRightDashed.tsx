import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconArrowRightDashed = ({
  'aria-label': ariaLabel = 'arrow-right-dashed',
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
    <path d="M14 5.5L12.5 7L17.5 12L12.5 17L14 18.5L20.5 12L14 5.5Z" fill="currentColor" />
    <path d="M15.5 13L16.5 12L15.5 11H14V13H15.5Z" fill="currentColor" />
    <path d="M10 11H12V13H10V11Z" fill="currentColor" />
    <path d="M8 13V11H6V13H8Z" fill="currentColor" />
  </svg>
);
