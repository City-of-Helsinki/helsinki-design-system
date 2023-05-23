import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconHistory = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M4 9V3H6L5.99882 5.29274C7.59123 3.86699 9.69437 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12H5C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C10.0926 5 8.36334 5.76291 7.10078 7.00023L9.5 7V9H4Z"
        fill="currentColor"
      />
      <path d="M13 7L13.0006 11.584L16.2426 14.8284L14.8284 16.2426L11.0007 12.4138L11 7H13Z" fill="currentColor" />
    </g>
  </svg>
);
