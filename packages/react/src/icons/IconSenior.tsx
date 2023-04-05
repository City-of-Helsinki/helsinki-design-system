import React from 'react';

import styles from './Icon.module.css';

interface IconProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  className?: string;
  color?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: React.CSSProperties;
}

export const IconSenior = ({
  ariaLabel = 'senior',
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
      d="M7.5 12.5C8.88071 12.5 10 13.6193 10 15V16H8V15C8 14.7239 7.77614 14.5 7.5 14.5C7.22386 14.5 7 14.7239 7 15V24H5V15C5 13.6193 6.11929 12.5 7.5 12.5ZM18 16V24H10V18H12V22H16V16H18ZM17 7C18.6569 7 20 8.34315 20 10V16H18V10L17.9933 9.88338C17.9355 9.38604 17.5128 9 17 9H11C10.4477 9 10 9.44772 10 10V11H8V10L8.00509 9.82373C8.09634 8.24892 9.40232 7 11 7H17ZM14 4C14.5523 4 15 3.55228 15 3C15 2.44772 14.5523 2 14 2C13.4477 2 13 2.44772 13 3C13 3.55228 13.4477 4 14 4ZM14 6C15.6569 6 17 4.65685 17 3C17 1.34315 15.6569 0 14 0C12.3431 0 11 1.34315 11 3C11 4.65685 12.3431 6 14 6Z"
      fill="currentColor"
    ></path>
  </svg>
);
