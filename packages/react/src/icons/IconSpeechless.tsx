import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconSpeechless = ({
  'aria-label': ariaLabel = 'speechless',
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
      d="M19 4H5C2.79086 4 1 5.79086 1 8V16C1 18.2091 2.79086 20 5 20H11C12.0636 20 12.9774 20.3916 13.7929 21.2071L14.5 21.9142L15.2071 21.2071C16.0226 20.3916 16.9364 20 18 20H19C21.2091 20 23 18.2091 23 16V8C23 5.79086 21.2091 4 19 4ZM5 6H19C20.1046 6 21 6.89543 21 8V16C21 17.1046 20.1046 18 19 18H18L17.8158 18.0027C16.5936 18.0387 15.4812 18.4339 14.4995 19.175C13.4698 18.3969 12.2948 18 11 18H5C3.89543 18 3 17.1046 3 16V8C3 6.89543 3.89543 6 5 6Z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
    />
    <path
      d="M16.707 8.70703L13.4141 12L16.707 15.293L15.293 16.707L12 13.4141L8.70703 16.707L7.29297 15.293L10.5859 12L7.29297 8.70703L8.70703 7.29297L12 10.5859L15.293 7.29297L16.707 8.70703Z"
      fill="currentColor"
    />
  </svg>
);
