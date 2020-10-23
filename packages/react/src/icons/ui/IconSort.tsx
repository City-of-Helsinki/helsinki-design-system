import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconSort = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M15,14.5 L16.5,16 L12,20.5 L7.5,16 L9,14.5 L12,17.5 L15,14.5 Z M12,3.5 L16.5,8 L15,9.5 L12,6.5 L9,9.5 L7.5,8 L12,3.5 Z"
      />
    </g>
  </svg>
);
