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

export const IconFacebook = ({
  ariaLabel = 'facebook',
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
      d="M19 3C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15.644L15.6442 13.8804H18.079L18.4286 11.1643H15.6442V9.42857C15.6442 8.64107 15.8612 8.1067 16.9902 8.1067H18.4286V5.67991L18.0781 5.64435L17.7377 5.61862C17.3573 5.59334 16.8651 5.57143 16.3312 5.57143C14.258 5.57143 12.8357 6.83705 12.8357 9.16339V11.1683H10.3929V13.8844H12.8397L12.839 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H19Z"
      fill="currentColor"
    />
  </svg>
);
