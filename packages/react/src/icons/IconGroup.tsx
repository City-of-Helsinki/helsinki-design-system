import React from 'react';

import { IconProps } from './Icon.interface';
import styles from './Icon.module.css';

export const IconGroup = ({
  ariaLabel = 'group',
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
      d="M14.5 16C16.3927 16 17.9345 17.5024 17.998 19.3797L18 19.5V22H16V19.5C16 18.7012 15.3755 18.0482 14.5881 18.0025L14.5 18H9.5C8.70116 18 8.04817 18.6245 8.00255 19.4119L8 19.5V22H6V19.5C6 17.6073 7.50239 16.0655 9.37967 16.002L9.5 16H14.5ZM16.8997 9.99881L20.5 10L20.6203 10.002C22.435 10.0633 23.8994 11.5061 23.995 13.3119L24 13.5V16H22V13.5L21.9975 13.4119C21.9545 12.6708 21.3736 12.074 20.6394 12.0064L20.5 12L16.8997 12.0012C16.9655 11.6777 17 11.3429 17 11C17 10.6571 16.9655 10.3223 16.8997 9.99881ZM7.10026 9.99881C7.03451 10.3223 7 10.6571 7 11C7 11.3429 7.03451 11.6777 7.10026 12.0012L3.5 12C2.70116 12 2.04817 12.6245 2.00255 13.4119L2 13.5V16H0V13.5C0 11.6073 1.50239 10.0655 3.37968 10.002L3.5 10L7.10026 9.99881ZM12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7ZM12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9ZM5.5 2C7.433 2 9 3.567 9 5.5C9 7.433 7.433 9 5.5 9C3.567 9 2 7.433 2 5.5C2 3.567 3.567 2 5.5 2ZM18.5 2C20.433 2 22 3.567 22 5.5C22 7.433 20.433 9 18.5 9C16.567 9 15 7.433 15 5.5C15 3.567 16.567 2 18.5 2ZM5.5 4C4.67157 4 4 4.67157 4 5.5C4 6.32843 4.67157 7 5.5 7C6.32843 7 7 6.32843 7 5.5C7 4.67157 6.32843 4 5.5 4ZM18.5 4C17.6716 4 17 4.67157 17 5.5C17 6.32843 17.6716 7 18.5 7C19.3284 7 20 6.32843 20 5.5C20 4.67157 19.3284 4 18.5 4Z"
      fill="currentColor"
    />
  </svg>
);