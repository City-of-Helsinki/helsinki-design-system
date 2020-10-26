import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconLinkExternal = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
      <path d="M10 3v2H5v14h14v-5h2v7H3V3h7zm11 0v8h-2V6.413l-7 7.001L10.586 12l6.999-7H13V3h8z" fill="currentColor" />
    </g>
  </svg>
);
