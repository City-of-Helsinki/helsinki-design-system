import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconCalendarPlus = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M20 14v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zM17 2a1 1 0 011 1v1h4v8h-2v-1H4v8h9v2H2V4h4V3a1 1 0 112 0v1h8V3a1 1 0 011-1zm3 4H4v3h16V6z"
        fill="currentColor"
      />
    </g>
  </svg>
);
