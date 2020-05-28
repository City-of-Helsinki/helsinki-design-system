import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconMenuHamburger: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path d="M22 17v2H2v-2h20zm0-6v2H2v-2h20zm0-6v2H2V5h20z" fill="currentColor" />
    </g>
  </svg>
);

export default IconMenuHamburger;
