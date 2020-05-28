import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconAngleLeft: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M24 0v24H0V0z" />
      <path fill="currentColor" d="M10.5 12l5 5-1.5 1.5L7.5 12 14 5.5 15.5 7z" />
    </g>
  </svg>
);

export default IconAngleLeft;
