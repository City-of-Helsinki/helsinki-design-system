import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconCollapse = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M17.5 2L12.5 7L7.5 2L6 3.5L12.5 10L19 3.5L17.5 2Z" fill="currentColor" />
      <path d="M17.5 22L12.5 17L7.5 22L6 20.5L12.5 14L19 20.5L17.5 22Z" fill="currentColor" />
    </g>
  </svg>
);
