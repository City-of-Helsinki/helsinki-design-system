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

export const IconFamily = ({
  ariaLabel = 'family',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M22 16V24H18V22H20V16H22ZM4 16V22H6V24H2V16H4ZM14 21V24H10V21H14ZM13 16C14.6569 16 16 17.3431 16 19V21H14V19C14 18.4477 13.5523 18 13 18H11C10.4477 18 10 18.4477 10 19V21H8V19C8 17.3431 9.34315 16 11 16H13ZM10 7C11.0544 7 11.9182 7.81588 11.9945 8.85074L12 8.988L12.0055 8.85074C12.0818 7.81588 12.9456 7 14 7H21C22.6569 7 24 8.34315 24 10V16H22V10C22 9.44772 21.5523 9 21 9H3C2.44772 9 2 9.44772 2 10V16H0V10C0 8.34315 1.34315 7 3 7H10ZM12 10.5C13.3807 10.5 14.5 11.6193 14.5 13C14.5 14.3807 13.3807 15.5 12 15.5C10.6193 15.5 9.5 14.3807 9.5 13C9.5 11.6193 10.6193 10.5 12 10.5ZM12 12.5C11.7239 12.5 11.5 12.7239 11.5 13C11.5 13.2761 11.7239 13.5 12 13.5C12.2761 13.5 12.5 13.2761 12.5 13C12.5 12.7239 12.2761 12.5 12 12.5ZM18 4C18.5523 4 19 3.55228 19 3C19 2.44772 18.5523 2 18 2C17.4477 2 17 2.44772 17 3C17 3.55228 17.4477 4 18 4ZM18 6C19.6569 6 21 4.65685 21 3C21 1.34315 19.6569 0 18 0C16.3431 0 15 1.34315 15 3C15 4.65685 16.3431 6 18 6ZM6 4C6.55228 4 7 3.55228 7 3C7 2.44772 6.55228 2 6 2C5.44772 2 5 2.44772 5 3C5 3.55228 5.44772 4 6 4ZM6 6C7.65685 6 9 4.65685 9 3C9 1.34315 7.65685 0 6 0C4.34315 0 3 1.34315 3 3C3 4.65685 4.34315 6 6 6Z" fill="currentColor"></path>
  </svg>
);
