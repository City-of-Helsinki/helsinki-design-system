import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconArtificialIntelligence = ({
  'aria-label': ariaLabel = 'artificial-intelligence',
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
      d="M12.0343 12.5234C12.0413 12.5512 12.1906 13.1465 12.34 13.5947L13.047 15.7363H10.9757L11.6925 13.5947C11.8416 13.1476 11.9906 12.5538 11.9982 12.5234H12.0343Z"
      fill="currentColor"
    />
    <path
      d="M22.0001 22H2.00012V2H22.0001V22ZM10.9982 10.875L8.16223 19.0195H9.88L10.505 17.1611H13.5177L14.1407 19.0195H15.9298L13.0939 10.875H10.9982ZM16.7296 10.875V19.0195H18.4835V10.875H16.7296ZM6.71692 5.4502C6.68691 6.91342 5.55822 8.03796 4.0929 8.07324L4.10657 9.60449C5.60873 9.64811 6.68166 10.7993 6.72083 12.2324L8.25012 12.2305C8.29214 10.7694 9.37647 9.65503 10.8605 9.60449L10.8741 8.07324C9.4088 8.03939 8.28669 6.91344 8.2511 5.4502H6.71692Z"
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
    />
  </svg>
);
