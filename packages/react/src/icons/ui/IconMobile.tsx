import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconMobile = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M15 2a4 4 0 013.995 3.8L19 6v12a4 4 0 01-3.8 3.995L15 22H9a4 4 0 01-3.995-3.8L5 18V6a4 4 0 013.8-3.995L9 2h6zm0 2H9a2 2 0 00-1.995 1.85L7 6v12a2 2 0 001.85 1.995L9 20h6a2 2 0 001.995-1.85L17 18V6a2 2 0 00-1.85-1.995L15 4zm-3 11.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
        fill="currentColor"
      />
    </g>
  </svg>
);
