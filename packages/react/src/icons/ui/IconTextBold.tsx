import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconTextBold = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M3,20 L3,17 L5,17 L5,7 L3,7 L3,4 L14,4 L14,4.027 L14.2481427,4.00692918 C14.3315104,4.00232997 14.4154831,4 14.5,4 C16.9852814,4 19,6.01471863 19,8.5 C19,9.47920963 18.6872375,10.3853697 18.1561603,11.1240324 C19.2814801,12.0388846 20,13.4355326 20,15 C20,17.6887547 17.8776933,19.8818181 15.2168896,19.9953805 L15,20 L3,20 Z M15,13 L8,13 L8,17 L15,17 L15.1492623,16.9945143 C16.1841222,16.9181651 17,16.0543618 17,15 C17,13.9456382 16.1841222,13.0818349 15.1492623,13.0054857 L15,13 Z M14,7 L8,7 L8,10 L14,10 C15.1045695,10 16,9.32842712 16,8.5 C16,7.67157288 15.1045695,7 14,7 Z"
      />
    </g>
  </svg>
);
