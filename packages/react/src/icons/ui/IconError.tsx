import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconError = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M11.128 2.51a1 1 0 011.7-.07l.044.07 9.562 17a1 1 0 01-.796 1.487l-.076.003H2.438a1 1 0 01-.906-1.423l.035-.067 9.562-17zM12 5.04L4.147 19h15.705L12 5.04zM13 16v2h-2v-2h2zm0-6.5v5h-2v-5h2z"
        fill="currentColor"
      />
    </g>
  </svg>
);
