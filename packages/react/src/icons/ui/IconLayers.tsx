import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconLayers = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <rect width="24" height="24" />
      <path
        fill="currentColor"
        d="M19,14.5 L21,15.5 L12,20 L3,15.5 L5,14.5 L12.0005205,18 L19,14.5 Z M19,11 L21,12 L12,16.5 L3,12 L5,11 L12.0005205,14.5 L19,11 Z M12,4 L21,8.5 L12,13 L3,8.5 L12,4 Z M12.0005205,6 L7,8.50052056 L12.0005205,11 L17,8.50052056 L12.0005205,6 Z"
      />
    </g>
  </svg>
);
