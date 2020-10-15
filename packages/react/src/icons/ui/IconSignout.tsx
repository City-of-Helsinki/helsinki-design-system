import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconSignout = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M16 2v5h-2V4H5v16h9v-3h2v5H3V2h13zm2 5l5 5-5 5-1.5-1.5 2.5-2.501L8 13v-2l10.999-.001L16.5 8.5 18 7z"
        fill="currentColor"
      />
    </g>
  </svg>
);
