import React from 'react';
import styles from '../../templates/Icon.module.css';

interface IconProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  className?: string,
  color?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: React.CSSProperties;
}

export const IconPaperclip = ({
  ariaLabel = 'paperclip',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M16 7H18V16C18 19.3137 15.3137 22 12 22C8.7616 22 6.12243 19.4344 6.00414 16.2249L6 16V6.5C6 4.01472 8.01472 2 10.5 2C12.9143 2 14.8845 3.90124 14.9951 6.28816L15 6.5V15C15 16.6569 13.6569 18 12 18C10.4023 18 9.09634 16.7511 9.00509 15.1763L9 15V7H11V15C11 15.5523 11.4477 16 12 16C12.5128 16 12.9355 15.614 12.9933 15.1166L13 15V6.5C13 5.11929 11.8807 4 10.5 4C9.17452 4 8.08996 5.03154 8.00532 6.33562L8 6.5V16C8 18.2091 9.79086 20 12 20C14.1422 20 15.8911 18.316 15.9951 16.1996L16 16V7Z" fill="currentColor"></path>
  </svg>
);
