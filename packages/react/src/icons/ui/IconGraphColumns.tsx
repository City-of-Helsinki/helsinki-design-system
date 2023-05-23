import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconGraphColumns = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8571 9.33333L21 9.33333L21 20L15.8571 20L15.8571 9.33333ZM9.42857 4L14.5714 4L14.5714 20L9.42857 20L9.42857 4ZM3 12L8.14286 12L8.14286 20L3 20L3 12Z"
        fill="currentColor"
      />
      ≈
    </g>
  </svg>
);
