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

export const IconDisplay = ({
  ariaLabel = 'display',
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
      d="M6 18C3.8578 18 2.10892 16.316 2.0049 14.1996L2 14V7C2 4.8578 3.68397 3.10892 5.80036 3.0049L6 3H18C20.1422 3 21.8911 4.68397 21.9951 6.80036L22 7V14C22 16.1422 20.316 17.8911 18.1996 17.9951L18 18H13C13 19.1046 13.8954 20 15 20H18V22H6V20H9C10.1046 20 11 19.1046 11 18H6ZM18 5H6C4.94564 5 4.08183 5.81588 4.00549 6.85074L4 7V14C4 15.0544 4.81588 15.9182 5.85074 15.9945L6 16H18C19.0544 16 19.9182 15.1841 19.9945 14.1493L20 14V7C20 5.94564 19.1841 5.08183 18.1493 5.00549L18 5Z"
      fill="currentColor"
    ></path>
  </svg>
);
