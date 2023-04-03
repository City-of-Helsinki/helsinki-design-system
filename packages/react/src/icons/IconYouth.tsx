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

export const IconYouth = ({
  ariaLabel = 'youth',
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
      d="M10 17V22H14V17H16V24H8V17H10ZM15.3333 9C16.8061 9 18 10.1939 18 11.6667V17H16V11.6667C16 11.2985 15.7015 11 15.3333 11H8.66667C8.33195 11 8.05485 11.2467 8.00723 11.5682L8 11.6667V17H6V11.67C6 10.1972 7.19391 9 8.66667 9H15.3333ZM13.5 0C14.6046 0 15.5 0.895431 15.5 2H18V4H15.5V5C15.5 5.98703 15.2478 6.9091 14.5784 7.57843C13.9091 8.24776 12.987 8.5 12 8.5C11.013 8.5 10.0909 8.24776 9.42157 7.57843C8.75224 6.9091 8.5 5.98703 8.5 5V2C8.5 0.895431 9.39543 0 10.5 0H13.5ZM13.5 4H10.5V5C10.5 5.66982 10.6693 5.99776 10.8358 6.16421C11.0022 6.33067 11.3302 6.5 12 6.5C12.6698 6.5 12.9978 6.33067 13.1642 6.16421C13.3307 5.99776 13.5 5.66982 13.5 5V4Z"
      fill="currentColor"
    ></path>
  </svg>
);
