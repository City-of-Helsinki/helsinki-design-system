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

export const IconTiktok = ({
  ariaLabel = 'tiktok',
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
      d="M19.0714 3H4.92857C3.86384 3 3 3.86384 3 4.92857V19.0714C3 20.1362 3.86384 21 4.92857 21H19.0714C20.1362 21 21 20.1362 21 19.0714V4.92857C21 3.86384 20.1362 3 19.0714 3ZM17.1454 10.8527C17.0471 10.8623 16.9485 10.8673 16.8497 10.8677C15.7666 10.8679 14.7563 10.3219 14.163 9.41571V14.3601C14.163 16.3784 12.5269 18.0146 10.5086 18.0146C8.49029 18.0146 6.85414 16.3784 6.85414 14.3601C6.85414 12.3419 8.49029 10.7057 10.5086 10.7057C10.5849 10.7057 10.6594 10.7126 10.7344 10.7173V12.5181C10.6594 12.5091 10.5857 12.4954 10.5086 12.4954C9.47848 12.4954 8.64343 13.3305 8.64343 14.3606C8.64343 15.3907 9.47848 16.2257 10.5086 16.2257C11.5389 16.2257 12.4487 15.414 12.4487 14.3837L12.4667 5.98629H14.1896C14.352 7.53126 15.5978 8.73802 17.1471 8.85129V10.8527"
      fill="currentColor"
    ></path>
  </svg>
);
