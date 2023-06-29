import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconMoneyBagFill = ({
  ariaLabel = 'money-bag-fill',
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
      d="M17.9772 3.90476C17.9772 2.95238 17.9772 2 11.9995 2C6.02259 2 6.02259 2.95251 6.02259 3.90476C6.02259 4.34797 7.21975 5.75613 8.85629 6.73027C5.23966 8.81779 2.37855 13.9814 2.03782 17.2381C1.5396 22 6.0227 22 11.9993 22C17.976 22 22.4603 22 21.9622 17.2381C21.6233 13.9983 18.7893 8.87132 15.199 6.76301C16.807 5.84216 17.9772 4.50064 17.9772 3.90476ZM12.464 14.716L12.116 15.856H10.712C10.916 16.66 11.336 17.2 12.212 17.2C13.184 17.2 13.52 16.336 13.532 15.352L15.116 16.348C14.744 17.56 13.784 18.592 12.212 18.592C10.64 18.592 9.452 17.68 9.032 15.856H8V14.716H8.888C8.876 14.584 8.876 14.44 8.876 14.284V14.02H8V12.88H9.02C9.44 10.984 10.712 10 12.212 10C13.724 10 14.744 10.96 15.116 12.184L13.532 13.168C13.532 12.184 13.16 11.392 12.212 11.392C11.384 11.392 10.928 12.016 10.712 12.88H12.98L12.644 14.02H10.568V14.716H12.464Z"
      fill="currentColor"
    />
  </svg>
);
