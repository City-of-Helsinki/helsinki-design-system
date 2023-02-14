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

export const IconCopy = ({
  ariaLabel = 'copy',
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
    <path fillRule="evenodd" clipRule="evenodd" d="M6 10V12H5V18H12V17H14V19C14 19.5523 13.5523 20 13 20H4C3.44772 20 3 19.5523 3 19V11C3 10.4477 3.44772 10 4 10H6ZM20 4C20.5523 4 21 4.44772 21 5V15C21 15.5523 20.5523 16 20 16H8C7.44772 16 7 15.5523 7 15V5C7 4.44772 7.44772 4 8 4H20ZM19 6H9V14H19V6Z" fill="currentColor"></path>
  </svg>
);
