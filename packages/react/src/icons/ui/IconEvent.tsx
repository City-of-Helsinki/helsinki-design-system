import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconEvent = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M15.4553546,22.2312419 L15.5474929,21.4985553 L15.8597217,19.0199278 L14.1757404,17.2064174 L13.6741207,16.6711966 L14.3907164,16.5308966 L16.811751,16.0736222 L17.9890116,13.880781 L18.3370674,13.2312419 L18.6851232,13.880781 L19.8623705,16.0736222 L22.2834049,16.5308966 L23,16.6711966 L22.498381,17.2064174 L20.8092852,19.0251222 L21.1215139,21.4985553 L21.2187667,22.2312419 L20.5584822,21.9142594 L18.3370674,20.8490202 L16.1156393,21.9142594 L15.4553548,22.2312419 L15.4553546,22.2312419 Z M17,2 C17.5522847,2 18,2.44771525 18,3 L18,4 L22,4 L22,12 L20,12 L20,11 L4,11 L4,19 L13,19 L13,21 L2,21 L2,4 L6,4 L6,3 C6,2.44771525 6.44771525,2 7,2 C7.55228475,2 8,2.44771525 8,3 L8,4 L16,4 L16,3 C16,2.44771525 16.4477153,2 17,2 Z M20,6 L4,6 L4,9 L20,9 L20,6 Z"
      />
    </g>
  </svg>
);
