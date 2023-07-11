import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconTrash = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M18 9H6l1.087 13h9.826L18 9zm-2.095 2l-.818 9H8.912l-.818-9h7.811zM12 2a2.97 2.97 0 012.995 2.82L15 5v1h3v2H6V6h3V5c0-1.688 1.331-3 3-3zm0 2c-.53 0-.938.365-.994.879L11 5v1h2V5c0-.577-.43-1-1-1z"
        fill="currentColor"
      />
    </g>
  </svg>
);
