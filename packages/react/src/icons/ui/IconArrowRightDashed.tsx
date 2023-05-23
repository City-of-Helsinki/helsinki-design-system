import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconArrowRightDashed = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    {...rest}
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <rect width="24" height="24" />
      <path d="M14 5.5L12.5 7L17.5 12L12.5 17L14 18.5L20.5 12L14 5.5Z" fill="currentColor" />
      <path d="M15.5 13L16.5 12L15.5 11H14V13H15.5Z" fill="currentColor" />
      <path d="M10 11H12V13H10V11Z" fill="currentColor" />
      <path d="M8 13V11H6V13H8Z" fill="currentColor" />
    </g>
  </svg>
);
