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

export const IconInfoCircleFill = ({
  ariaLabel = 'info-circle-fill',
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
      d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM13 10V16.5H15V18H9V16.5H11V11.5H9V10H13ZM11.8125 6C12.5374 6 13.125 6.5876 13.125 7.3125C13.125 8.03735 12.5374 8.625 11.8125 8.625C11.0876 8.625 10.5 8.03735 10.5 7.3125C10.5 6.5876 11.0876 6 11.8125 6Z"
      fill="currentColor"
    ></path>
  </svg>
);
