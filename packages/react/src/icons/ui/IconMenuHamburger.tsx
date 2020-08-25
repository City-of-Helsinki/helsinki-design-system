/* eslint-disable import/prefer-default-export */
import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export function IconMenuHamburger({ size = 's', className = '', style = {}, ...rest }: IconProps) {
  return (
    <svg
      className={classNames(styles.icon, styles[size], className)}
      style={style}
      viewBox="0 0 24 24"
      {...rest}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path d="M22 17v2H2v-2h20zm0-6v2H2v-2h20zm0-6v2H2V5h20z" fill="currentColor" />
      </g>
    </svg>
  );
}
