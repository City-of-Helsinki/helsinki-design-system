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

export const IconChildren = ({
  ariaLabel = 'children',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M5 24V21H7V24H5Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7 24V21H9V24H7Z" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 18C5.44772 18 5 18.4477 5 19V21H3V19C3 17.3431 4.34315 16 6 16H8C9.65685 16 11 17.3431 11 19V21H9V19C9 18.4477 8.55228 18 8 18H6Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 10.5C8.38071 10.5 9.5 11.6193 9.5 13C9.5 14.3807 8.38071 15.5 7 15.5C5.61929 15.5 4.5 14.3807 4.5 13C4.5 11.6193 5.61929 10.5 7 10.5ZM7 12.5C6.72386 12.5 6.5 12.7239 6.5 13C6.5 13.2761 6.72386 13.5 7 13.5C7.27614 13.5 7.5 13.2761 7.5 13C7.5 12.7239 7.27614 12.5 7 12.5Z"
      fill="currentColor"
    />
    <path fillRule="evenodd" clipRule="evenodd" d="M15 24V21H17V24H15Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M17 24V21H19V24H17Z" fill="currentColor" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 18C15.4477 18 15 18.4477 15 19V21H13V19C13 17.3431 14.3431 16 16 16H18C19.6569 16 21 17.3431 21 19V21H19V19C19 18.4477 18.5523 18 18 18H16Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 13.5C17.2761 13.5 17.5 13.2761 17.5 13C17.5 12.7239 17.2761 12.5 17 12.5C16.7239 12.5 16.5 12.7239 16.5 13C16.5 13.2761 16.7239 13.5 17 13.5ZM17 15.5C18.3807 15.5 19.5 14.3807 19.5 13C19.5 11.6193 18.3807 10.5 17 10.5C15.6193 10.5 14.5 11.6193 14.5 13C14.5 14.3807 15.6193 15.5 17 15.5Z"
      fill="currentColor"
    />
    <path
      d="M13.2195 14.4549C12.799 14.8754 12.6372 15.4567 12.7342 16.0009C13.2784 16.0979 13.8597 15.9361 14.2802 15.5156C14.7007 15.0951 14.8624 14.5138 14.7655 13.9696C14.2213 13.8727 13.64 14.0344 13.2195 14.4549Z"
      fill="currentColor"
    />
    <path
      d="M20.7764 14.4549C21.1969 14.8754 21.3587 15.4567 21.2617 16.0009C20.7175 16.0978 20.1363 15.9361 19.7158 15.5156C19.2953 15.0951 19.1335 14.5138 19.2305 13.9696C19.7746 13.8726 20.3559 14.0344 20.7764 14.4549Z"
      fill="currentColor"
    />
  </svg>
);
