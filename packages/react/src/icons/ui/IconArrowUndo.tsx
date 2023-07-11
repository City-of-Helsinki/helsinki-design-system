import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconArrowUndo = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M14,10 C16.209139,10 18,11.790861 18,14 C18,16.209139 16.209139,18 14,18 L10,18 L10,20 L14.0363636,20 L14.1880003,19.9980989 C17.4131018,19.9171471 20,17.261126 20,14 C20,10.738874 17.4131018,8.08285293 14.1880003,8.00190107 L8.5,8 L12,4.5 L10.5,3 L4.5,9 L10.5,15 L12,13.5 L8.5,10 L14,10 Z"
      />
    </g>
  </svg>
);
