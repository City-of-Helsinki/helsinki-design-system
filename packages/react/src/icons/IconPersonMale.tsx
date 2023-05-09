import React from 'react';
import styles from '../../templates/Icon.module.css';

interface IconProps {
  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaHidden?: boolean;
  className?: string;
  color?: string;
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: React.CSSProperties;
}

export const IconPersonMale = ({
  ariaLabel = 'person-male',
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
      d="M11 16V22H13V16H15V24H9V16H11ZM14.5 7C16.3927 7 17.9345 8.50239 17.998 10.3797L18 10.5V16H16V10.5C16 9.70116 15.3755 9.04817 14.5881 9.00255L14.5 9H9.5C8.70116 9 8.04817 9.62446 8.00255 10.4119L8 10.5V16H6V10.5C6 8.60727 7.50239 7.06545 9.37967 7.00203L9.5 7H14.5ZM12 0C13.6569 0 15 1.34315 15 3C15 4.65685 13.6569 6 12 6C10.3431 6 9 4.65685 9 3C9 1.34315 10.3431 0 12 0ZM12 2C11.4477 2 11 2.44772 11 3C11 3.55228 11.4477 4 12 4C12.5523 4 13 3.55228 13 3C13 2.44772 12.5523 2 12 2Z"
      fill="currentColor"
    ></path>
  </svg>
);
