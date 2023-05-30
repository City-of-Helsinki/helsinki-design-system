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

export const IconEntrepreneur = ({
  ariaLabel = 'entrepreneur',
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
      d="M12 9C13.933 9 15.5 7.433 15.5 5.5C15.5 3.567 13.933 2 12 2C10.067 2 8.5 3.567 8.5 5.5C8.5 7.433 10.067 9 12 9ZM12 11C15.0376 11 17.5 8.53757 17.5 5.5C17.5 2.46243 15.0376 0 12 0C8.96243 0 6.5 2.46243 6.5 5.5C6.5 8.53757 8.96243 11 12 11ZM18 22H13V24H11V22H6V15H3C2.44772 15 2 15.4477 2 16V24H0V16C0 14.3431 1.34315 13 3 13H21C22.6569 13 24 14.3431 24 16V24H22V16C22 15.4477 21.5523 15 21 15H18V22ZM8 17.1205V20H10.0568L8 17.1205ZM16 17.1205L13.9432 20H16V17.1205ZM9 15L12 19.2795L15 15H9Z"
      fill="currentColor"
    />
  </svg>
);
