import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconPlaybackNext = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
      <path fill="currentColor" d="M19,4 L19,20 L17,20 L17,4 L19,4 Z M5,5 L17,12 L5,19 L5,5 Z" />
    </g>
  </svg>
);
