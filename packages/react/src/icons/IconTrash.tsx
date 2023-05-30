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

export const IconTrash = ({
  ariaLabel = 'trash',
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
      d="M18 9H6L7.08679 22H16.9132L18 9ZM15.905 11L15.087 20H8.912L8.094 11H15.905ZM12 2C13.609 2 14.9045 3.21958 14.995 4.82058L15 5V6H18V8H6V6H9V5C9 3.31159 10.3314 2 12 2ZM12 4C11.4701 4 11.0621 4.36466 11.0065 4.8788L11 5V6H13V5C13 4.42292 12.5707 4 12 4Z"
      fill="currentColor"
    />
  </svg>
);
