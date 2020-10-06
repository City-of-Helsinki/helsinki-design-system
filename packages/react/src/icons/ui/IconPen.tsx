import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconPen = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M16.75 3L4.5 15.25l.014 4.736L9.25 20 21.5 7.75 16.75 3zM6.5 16L16.75 5.75l2 2L8.5 18l-1.993-.006L6.5 16z"
        fill="currentColor"
      />
    </g>
  </svg>
);
