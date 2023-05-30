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

export const IconTextBold = ({
  ariaLabel = 'text-bold',
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
      d="M3 20V17H5V7H3V4H14V4.027L14.2481 4.00693C14.3315 4.00233 14.4155 4 14.5 4C16.9853 4 19 6.01472 19 8.5C19 9.47921 18.6872 10.3854 18.1562 11.124C19.2815 12.0389 20 13.4355 20 15C20 17.6888 17.8777 19.8818 15.2169 19.9954L15 20H3ZM15 17C16.1046 17 17 16.1046 17 15C17 13.8954 16.1046 13 15 13H8V17H15ZM8 10H14C15.1046 10 16 9.32843 16 8.5C16 7.67157 15.1046 7 14 7H8V10Z"
      fill="currentColor"
    />
  </svg>
);
