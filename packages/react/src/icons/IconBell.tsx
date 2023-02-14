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

export const IconBell = ({
  ariaLabel = 'bell',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M18 17L17.998 16.7558C17.9834 15.914 17.888 15.4219 17.6646 15.0002H6.33536C6.11201 15.4219 6.01663 15.914 6.00202 16.7558L6 17H18ZM13 19H11C11 19.5523 11.4477 20 12 20C12.5128 20 12.9355 19.614 12.9933 19.1166L13 19ZM12 4C9.8578 4 8.10892 5.68397 8.0049 7.80036L8 8V11C8 11.8478 7.90415 12.4638 7.68639 13.001H16.3136C16.12 12.5235 16.0228 11.9837 16.0036 11.2742L16 11V8C16 5.79086 14.2091 4 12 4ZM5.10695 13.2598L5.34224 12.9814C5.82828 12.4172 5.98003 12.0961 5.9981 11.2009L6 11V8C6 4.68629 8.68629 2 12 2C15.2384 2 17.8776 4.56557 17.9959 7.77506L18 8L18.0019 11.2009C18.0186 12.0272 18.1492 12.3644 18.5514 12.8551L18.8931 13.2598C19.6251 14.1657 19.9597 15.0654 19.9966 16.6873L20 17V19H15C15 20.6569 13.6569 22 12 22C10.4023 22 9.09634 20.7511 9.00509 19.1763L9 19H4V17C4 15.1778 4.3292 14.2223 5.10695 13.2598Z" fill="currentColor"></path>
  </svg>
);
