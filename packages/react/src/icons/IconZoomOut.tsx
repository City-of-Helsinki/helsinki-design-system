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

export const IconZoomOut = ({
  ariaLabel = 'zoom-out',
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
      d="M14 2C18.4183 2 22 5.58172 22 10C22 14.4183 18.4183 18 14 18C12.1298 18 10.4095 17.3583 9.04729 16.283L3.41421 21.9142L2 20.5L7.64217 14.8564C6.61203 13.5098 6 11.8264 6 10C6 5.58172 9.58172 2 14 2ZM14 4C10.6863 4 8 6.68629 8 10C8 13.3137 10.6863 16 14 16C17.3137 16 20 13.3137 20 10C20 6.68629 17.3137 4 14 4ZM18 9V11H10V9H18Z"
      fill="currentColor"
    ></path>
  </svg>
);
