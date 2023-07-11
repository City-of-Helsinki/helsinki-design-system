import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconAngleUp = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 24h24V0H0z" />
      <path fill="currentColor" d="M12 11.5l5 5 1.5-1.5L12 8.5 5.5 15 7 16.5z" />
    </g>
  </svg>
);
