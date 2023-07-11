import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconPlaybackRewind = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <polygon points="0 24 0 0 24 0 24 24" transform="matrix(-1 0 0 1 24 0)" />
      <path
        fill="currentColor"
        d="M3,5 L11,12 L3,19 L3,5 Z M11,5 L19,12 L11,19 L11,5 Z"
        transform="matrix(-1 0 0 1 22 0)"
      />
    </g>
  </svg>
);
