import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconUnorderedList = ({
  'aria-label': ariaLabel = 'unordered-list',
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
    <path d="M7.99988 3H21.9999V5H7.99988V3Z" fill="currentColor" />
    <path d="M7.99988 11H21.9999V13H7.99988V11Z" fill="currentColor" />
    <path d="M7.99988 19H21.9999V21H7.99988V19Z" fill="currentColor" />
    <use xlinkHref="#stroke0_28925_2008" fill="currentColor" />
    <use xlinkHref="#stroke0_28925_2008" fill="currentColor" />
    <use xlinkHref="#stroke1_28925_2008" fill="currentColor" />
    <use xlinkHref="#stroke1_28925_2008" fill="currentColor" />
    <use xlinkHref="#stroke2_28925_2008" fill="currentColor" />
    <use xlinkHref="#stroke1_28925_2008" fill="currentColor" />
    <use xlinkHref="#stroke2_28925_2008" fill="currentColor" />
    <defs>
      <path
        id="stroke0_28925_2008"
        d="M5.99988 4C5.99988 5.10457 5.10445 6 3.99988 6C2.89531 6 1.99988 5.10457 1.99988 4C1.99988 2.89543 2.89531 2 3.99988 2C5.10445 2 5.99988 2.89543 5.99988 4Z"
      />
      <path
        id="stroke1_28925_2008"
        d="M5.99988 12C5.99988 13.1046 5.10445 14 3.99988 14C2.89531 14 1.99988 13.1046 1.99988 12C1.99988 10.8954 2.89531 10 3.99988 10C5.10445 10 5.99988 10.8954 5.99988 12Z"
      />
      <path
        id="stroke2_28925_2008"
        d="M5.99988 20C5.99988 21.1046 5.10445 22 3.99988 22C2.89531 22 1.99988 21.1046 1.99988 20C1.99988 18.8954 2.89531 18 3.99988 18C5.10445 18 5.99988 18.8954 5.99988 20Z"
      />
    </defs>
  </svg>
);
