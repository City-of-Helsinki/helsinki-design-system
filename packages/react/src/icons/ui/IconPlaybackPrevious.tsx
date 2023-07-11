import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconPlaybackPrevious = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
      <path fill="currentColor" d="M5,4 L5,20 L7,20 L7,4 L5,4 Z M19,5 L7,12 L19,19 L19,5 Z" />
    </g>
  </svg>
);
