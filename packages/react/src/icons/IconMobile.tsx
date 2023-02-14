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

export const IconMobile = ({
  ariaLabel = 'mobile',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M15 2C17.1422 2 18.8911 3.68397 18.9951 5.80036L19 6V18C19 20.1422 17.316 21.8911 15.1996 21.9951L15 22H9C6.8578 22 5.10892 20.316 5.0049 18.1996L5 18V6C5 3.8578 6.68397 2.10892 8.80036 2.0049L9 2H15ZM15 4H9C7.94564 4 7.08183 4.81588 7.00549 5.85074L7 6V18C7 19.0544 7.81588 19.9182 8.85074 19.9945L9 20H15C16.0544 20 16.9182 19.1841 16.9945 18.1493L17 18V6C17 4.94564 16.1841 4.08183 15.1493 4.00549L15 4ZM12 15.5C12.8284 15.5 13.5 16.1716 13.5 17C13.5 17.8284 12.8284 18.5 12 18.5C11.1716 18.5 10.5 17.8284 10.5 17C10.5 16.1716 11.1716 15.5 12 15.5Z" fill="currentColor"></path>
  </svg>
);
