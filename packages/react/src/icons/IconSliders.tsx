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

export const IconSliders = ({
  ariaLabel = 'sliders',
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
      d="M16 15C17.3063 15 18.4175 15.8349 18.8293 17.0001L22 17V19L18.829 19.0009C18.4169 20.1656 17.3059 21 16 21C14.6941 21 13.5831 20.1656 13.171 19.0009L2 19V17L13.1707 17.0001C13.5825 15.8349 14.6937 15 16 15ZM16 17C15.4477 17 15 17.4477 15 18C15 18.5523 15.4477 19 16 19C16.5523 19 17 18.5523 17 18C17 17.4477 16.5523 17 16 17ZM7 9C8.30625 9 9.41751 9.83485 9.82933 11.0001L22 11V13L9.82898 13.0009L9.8251 13.0118C9.42883 14.1181 8.40112 14.9239 7.17627 14.9949L7 15C5.69412 15 4.58311 14.1656 4.17102 13.0009L2 13V11L4.17067 11.0001L4.1749 10.9882C4.59004 9.82919 5.69819 9 7 9ZM7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11ZM12 3C13.3063 3 14.4175 3.83485 14.8293 5.00009L22 5V7L14.829 7.0009C14.4169 8.16562 13.3059 9 12 9C10.6941 9 9.58312 8.16562 9.17102 7.0009L2 7V5L9.17067 5.00009C9.58249 3.83485 10.6937 3 12 3ZM12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5Z"
      fill="currentColor"
    />
  </svg>
);
