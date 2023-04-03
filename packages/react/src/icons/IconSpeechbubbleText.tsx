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

export const IconSpeechbubbleText = ({
  ariaLabel = 'speechbubble-text',
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
      d="M19 4C21.1422 4 22.8911 5.68397 22.9951 7.80036L23 8V16C23 18.1422 21.316 19.8911 19.1996 19.9951L19 20H18C17.0124 20 16.1539 20.3377 15.3834 21.0388L15.2071 21.2071L14.5 21.9142L13.7929 21.2071C13.0357 20.4499 12.1936 20.0581 11.2256 20.006L11 20H5C2.8578 20 1.10892 18.316 1.0049 16.1996L1 16V8C1 5.8578 2.68397 4.10892 4.80036 4.0049L5 4H19ZM19 6H5C3.94564 6 3.08183 6.81588 3.00549 7.85074L3 8V16C3 17.0544 3.81588 17.9182 4.85074 17.9945L5 18H11C12.2948 18 13.4698 18.3969 14.4995 19.175C15.4057 18.4909 16.4233 18.1015 17.5358 18.0174L17.8158 18.0027L18 18H19C20.0544 18 20.9182 17.1841 20.9945 16.1493L21 16V8C21 6.94564 20.1841 6.08183 19.1493 6.00549L19 6ZM18 13V15H6V13H18ZM18 9V11H6V9H18Z"
      fill="currentColor"
    ></path>
  </svg>
);
