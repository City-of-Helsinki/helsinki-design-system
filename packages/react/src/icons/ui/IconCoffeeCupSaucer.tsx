import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconCoffeeCupSaucer = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
      <path
        fill="currentColor"
        d="M19,18 C19,19.1045695 18.1045695,20 17,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L19,18 Z M16,5 C16.5522847,5 17,5.44771525 17,6 L19,6 C20.6568542,6 22,7.790861 22,10 C22,12.1302412 20.75108,13.8715478 19.1762728,13.9932097 L19,14 L16.8737865,14.0007613 C16.429479,15.7256022 14.8635652,17 13,17 L8,17 C5.790861,17 4,15.209139 4,13 L4,6 C4,5.44771525 4.44771525,5 5,5 L16,5 Z M17,12 L19,12 L19.0587576,11.9966049 C19.5836933,11.9357739 20,11.0651206 20,10 C20,8.8954305 19.5522847,8 19,8 L17,8 L17,12 Z"
      />
    </g>
  </svg>
);
