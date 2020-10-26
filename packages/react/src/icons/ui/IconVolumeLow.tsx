import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconVolumeLow = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M15,2.5 L15,21.5 L9.273,17 L6,17 C3.23857625,17 1,14.7614237 1,12 C1,9.28538004 3.16333539,7.07603414 5.86004758,7.0019209 L9.273,7 L15,2.5 Z M13,6.8115 L10,8.926 L10,15.073 L13,17.188 L13,6.8115 Z M17.2218254,7.73654403 C19.5048905,10.0196091 19.5634306,13.6848168 17.3974458,16.038761 L17.2218254,16.2218254 L15.8076118,14.8076118 C17.3176391,13.2975846 17.3679733,10.8806204 15.9586146,9.31013063 L15.8076118,9.1507576 L17.2218254,7.73654403 Z M6.02744815,8.99981164 L5.91499246,9.00116602 C4.29498194,9.04568847 3,10.3746044 3,12 C3,13.6191985 4.28278744,14.9387859 5.88753087,14.9979308 L6,15 L8,15 L8,9 L6.02744815,8.99981164 Z"
      />
    </g>
  </svg>
);
