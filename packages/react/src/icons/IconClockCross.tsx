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

export const IconClockCross = ({
  ariaLabel = 'clock-cross',
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
      d="M12 2C17.5228 2 22 6.47715 22 12C22 12.168 21.9959 12.3351 21.9877 12.5011L19.9846 12.5005C19.9948 12.335 20 12.1681 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C12.339 20 12.6731 19.9789 13.001 19.938L13.0011 21.9505C12.6718 21.9832 12.3379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM20.5 14.5L22 16L20 18C20.8902 18.8716 21.5569 19.5382 22 20C22.4431 20.4618 22.4549 20.5022 22.0355 20.1213L20.5 21.5L18.5 19.5L16.5 21.5L15 20L17 18L15 16L16.5 14.5L18.5 16.5L20.5 14.5ZM13 6L12.9993 12.4138L12.7054 12.706L12.7071 12.7071L9.17157 16.2426L7.75736 14.8284L10.9994 11.584L11 6H13Z"
      fill="currentColor"
    />
  </svg>
);
