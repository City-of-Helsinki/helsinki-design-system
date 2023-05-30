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

export const IconVideocamera = ({
  ariaLabel = 'videocamera',
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
      d="M13 5C15.0807 5 16.7903 6.58866 16.9821 8.61916L23 6.61257V17.3874L16.9821 15.3808C16.7967 17.3437 15.193 18.8936 13.2068 18.9947L13 19H5C2.8578 19 1.10892 17.316 1.0049 15.1996L1 15V9C1 6.8578 2.68397 5.10892 4.80036 5.0049L5 5H13ZM13 7H5C3.94564 7 3.08183 7.81588 3.00549 8.85074L3 9V15C3 16.0544 3.81588 16.9182 4.85074 16.9945L5 17H13C14.0544 17 14.9182 16.1841 14.9945 15.1493L15 15V9C15 7.94564 14.1841 7.08183 13.1493 7.00549L13 7ZM21 9.387L17 10.72V13.279L21 14.612V9.387ZM6 9C6.55228 9 7 9.44772 7 10C7 10.5523 6.55228 11 6 11C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9Z"
      fill="currentColor"
    />
  </svg>
);
