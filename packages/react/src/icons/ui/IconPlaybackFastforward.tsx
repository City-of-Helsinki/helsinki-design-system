import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconPlaybackFastforward = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <polygon points="0 24 0 0 24 0 24 24" />
      <path fill="currentColor" d="M5,5 L13,12 L5,19 L5,5 Z M13,5 L21,12 L13,19 L13,5 Z" />
    </g>
  </svg>
);
