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

export const IconMicrophone = ({
  ariaLabel = 'microphone',
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
      d="M7 11.5C7 14.2614 9.23858 16.5 12 16.5C14.6888 16.5 16.8818 14.3777 16.9954 11.7169L17 11.5H19C19 15.0261 16.3928 17.9433 13.001 18.429L13 21H16V23H8V21H11V18.4291C7.68518 17.955 5.11952 15.1585 5.00406 11.7407L5 11.5H7ZM12 1C13.6569 1 15 2.34315 15 4V11.5C15 13.1569 13.6569 14.5 12 14.5C10.3431 14.5 9 13.1569 9 11.5V4C9 2.34315 10.3431 1 12 1Z"
      fill="currentColor"
    ></path>
  </svg>
);
