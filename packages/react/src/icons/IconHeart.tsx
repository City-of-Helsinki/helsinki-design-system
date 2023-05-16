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

export const IconHeart = ({
  ariaLabel = 'heart',
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
      d="M19.7316 11.5421C18.5468 12.7484 17.4496 13.7333 16.3878 14.6859C14.8996 16.0213 13.4921 17.2844 12.0002 19C10.5083 17.2848 9.10004 16.0213 7.61147 14.6851C6.5497 13.733 5.45242 12.7481 4.26844 11.5421C3.45072 10.7094 3 9.59964 3 8.41799C3 7.23633 3.45072 6.1266 4.26844 5.29392C5.08766 4.45934 6.17821 4 7.33939 4C10.4122 4 11.4377 6.70963 12.0013 7.7246C12.5656 6.70963 13.5904 4 16.6636 4C17.8229 4 18.9123 4.45934 19.7316 5.29392C20.5493 6.1266 21 7.23633 21 8.41799C21 9.59964 20.5493 10.7094 19.7316 11.5421ZM16.8423 2C13.9323 2 12.4662 3.80597 12.0014 4.51758C11.5369 3.80597 10.0712 2 7.16076 2H7.15727C5.51192 2 3.96474 2.65416 2.80135 3.84203C1.6399 5.02871 1 6.60804 1 8.28999C1 9.97195 1.6399 11.5513 2.80135 12.738C4.06719 14.03 5.22708 15.0737 6.34895 16.0832C7.93027 17.5061 9.4239 18.85 10.9897 20.6949C11.1694 20.9064 11.8465 21.7979 11.8535 21.807L11.9998 22L12.1461 21.807C12.1531 21.7979 12.8302 20.9064 13.0099 20.6949C14.5761 18.85 16.0697 17.5061 17.6511 16.0832C18.7729 15.0737 19.9328 14.03 21.1983 12.7376C22.3601 11.5513 23 9.97195 23 8.28999C23 6.60804 22.3601 5.02871 21.1983 3.84242C20.0353 2.65416 18.4881 2 16.8423 2Z"
      fill="currentColor"
    ></path>
  </svg>
);
