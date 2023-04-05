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

export const IconVolumeMinus = ({
  ariaLabel = 'volume-minus',
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
      d="M15 2.5V21.5L9.273 17H6C3.23858 17 1 14.7614 1 12C1 9.28538 3.16334 7.07603 5.86005 7.00192L9.273 7L15 2.5ZM13 6.8115L10 8.926V15.073L13 17.188V6.8115ZM8 9L6.02745 8.99981L5.91499 9.00117C4.29498 9.04569 3 10.3746 3 12C3 13.6192 4.28279 14.9388 5.88753 14.9979L6 15H8V9ZM24 11V13H17V11H24Z"
      fill="currentColor"
    ></path>
  </svg>
);
