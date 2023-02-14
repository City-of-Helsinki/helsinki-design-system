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

export const IconLock = ({
  ariaLabel = 'lock',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C14.7146 2 16.924 4.16334 16.9981 6.86005L17 7V9H19V22H5V9H7V7C7 4.23858 9.23858 2 12 2ZM17 11H7V20H17V11ZM13 13V18H11V13H13ZM12 4C10.3808 4 9.06121 5.28279 9.00207 6.88753L9 7V9H15V7C15 5.34315 13.6569 4 12 4Z" fill="currentColor"></path>
  </svg>
);
