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

export const IconPrinter = ({
  ariaLabel = 'printer',
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
      d="M18 3V8H18.5C20.5 8 22 9.50002 22 11.5V19L18 19V22H6V19L2 19V11.5C2 9.50002 3.5 8 5.5 8H6V3H18ZM16 16H8V20H16V16ZM18.5 10H5.5C4.5 10 4 10.5 4 11.5V17H6V14H18V17H20V11.5C20 10.5 19.5 10 18.5 10ZM6 11C6.55228 11 7 11.4477 7 12C7 12.5523 6.55228 13 6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11ZM16 5H8V8H16V5Z"
      fill="currentColor"
    ></path>
  </svg>
);
