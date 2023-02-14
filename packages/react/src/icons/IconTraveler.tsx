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

export const IconTraveler = ({
  ariaLabel = 'traveler',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M7.5999 10.5C9.25675 10.5 10.5999 11.8431 10.5999 13.5V14H14V24H0V14H3.3999V13.5C3.3999 11.8431 4.74305 10.5 6.3999 10.5H7.5999ZM22 16V24H18V22H20V16H22ZM12 16H2V22H12V16ZM21 7C22.6569 7 24 8.34315 24 10V16H22V10C22 9.44772 21.5523 9 21 9H15C14.4477 9 14 9.44772 14 10V12H12V10C12 8.34315 13.3431 7 15 7H21ZM7.5999 12.5H6.3999C5.84762 12.5 5.3999 12.9477 5.3999 13.5V14H8.5999V13.5C8.5999 12.9477 8.15219 12.5 7.5999 12.5ZM18 4C18.5523 4 19 3.55228 19 3C19 2.44772 18.5523 2 18 2C17.4477 2 17 2.44772 17 3C17 3.55228 17.4477 4 18 4ZM18 6C19.6569 6 21 4.65685 21 3C21 1.34315 19.6569 0 18 0C16.3431 0 15 1.34315 15 3C15 4.65685 16.3431 6 18 6Z" fill="currentColor"></path>
  </svg>
);
