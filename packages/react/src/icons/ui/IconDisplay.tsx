import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconDisplay = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M6,18 C3.85780461,18 2.10892112,16.3160315 2.00489531,14.1996403 L2,14 L2,7 C2,4.85780461 3.68396847,3.10892112 5.80035966,3.00489531 L6,3 L18,3 C20.1421954,3 21.8910789,4.68396847 21.9951047,6.80035966 L22,7 L22,14 C22,16.1421954 20.3160315,17.8910789 18.1996403,17.9951047 L18,18 L13,18 C13,19.1045695 13.8954305,20 15,20 L18,20 L18,22 L6,22 L6,20 L9,20 C10.1045695,20 11,19.1045695 11,18 L6,18 Z M18,5 L6,5 C4.9456382,5 4.08183488,5.81587779 4.00548574,6.85073766 L4,7 L4,14 C4,15.0543618 4.81587779,15.9181651 5.85073766,15.9945143 L6,16 L18,16 C19.0543618,16 19.9181651,15.1841222 19.9945143,14.1492623 L20,14 L20,7 C20,5.9456382 19.1841222,5.08183488 18.1492623,5.00548574 L18,5 Z"
      />
    </g>
  </svg>
);
