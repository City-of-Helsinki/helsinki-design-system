import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconHome = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M1 13L12 2l11 11-1.5 1.5L20 13v8H4v-8l-1.5 1.5L1 13zm11-8l-6 6v8l2.999-.001L9 12h6l-.001 6.999L18 19v-8l-6-6zm1 9h-2l-.001 4.999h2L13 14z"
        fill="currentColor"
      />
    </g>
  </svg>
);
