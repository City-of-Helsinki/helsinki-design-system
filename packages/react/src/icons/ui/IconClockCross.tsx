import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconClockCross = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,12.1680222 21.9958561,12.3350766 21.9876649,12.5010665 L19.9845993,12.500482 C19.994816,12.3349662 20,12.1680885 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,16.418278 7.581722,20 12,20 C12.3389895,20 12.6730544,19.9789157 13.0009551,19.9379871 L13.0010997,21.9505155 C12.6718374,21.9832433 12.3378756,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M20.5,14.5 L22,16 L20,18 C20.8902438,18.87157 21.5569105,19.5382367 22,20 C22.4430895,20.4617633 22.4549342,20.5022034 22.0355339,20.1213203 L20.5,21.5 L18.5,19.5 L16.5,21.5 L15,20 L17,18 L15,16 L16.5,14.5 L18.5,16.5 L20.5,14.5 Z M13,6 L12.9992525,12.4137864 L12.7053593,12.706 L12.7071068,12.7071068 L9.17157288,16.2426407 L7.75735931,14.8284271 L10.9993593,11.584 L11,6 L13,6 Z"
      />
    </g>
  </svg>
);
