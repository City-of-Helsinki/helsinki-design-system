import React from 'react';

import styles from './Icon.module.css';
import { IconProps, IconSize } from './Icon.interface';

export const IconHeartFill = ({
  'aria-label': ariaLabel = 'heart-fill',
  'aria-hidden': ariaHidden = true,
  className = '',
  color,
  size = IconSize.Small,
  style = {},
  ...rest
}: IconProps) => (
  <svg
    aria-label={ariaLabel}
    aria-hidden={ariaHidden}
    className={[styles.icon, styles[size], className].filter((e) => e).join(' ')}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    color={color}
    style={style}
    {...rest}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.8423 2C13.9323 2 12.4662 3.80597 12.0014 4.51758C11.5369 3.80597 10.0712 2 7.16076 2H7.15727C5.51192 2 3.96474 2.65416 2.80135 3.84203C1.6399 5.02871 1 6.60804 1 8.28999C1 9.97195 1.6399 11.5513 2.80135 12.738C4.06719 14.03 5.22708 15.0737 6.34895 16.0832C7.93027 17.5061 9.4239 18.85 10.9897 20.6949C11.1694 20.9064 11.8465 21.7979 11.8535 21.807L11.9998 22L12.1461 21.807C12.1531 21.7979 12.8302 20.9064 13.0099 20.6949C14.5761 18.85 16.0697 17.5061 17.6511 16.0832C18.7729 15.0737 19.9328 14.03 21.1983 12.7376C22.3601 11.5513 23 9.97195 23 8.28999C23 6.60804 22.3601 5.02871 21.1983 3.84242C20.0353 2.65416 18.4881 2 16.8423 2Z"
      fill="currentColor"
    />
  </svg>
);
