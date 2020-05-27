import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconWifiCrossed: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M19.793 2.793l1.414 1.414-16.5 16.5-1.414-1.414 16.5-16.5zM12 17.533a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm1.525-3.525a6.389 6.389 0 012.615 1.515l.112.109-1.415 1.414a4.335 4.335 0 00-3.06-1.29l1.748-1.748zm-2.56-4.507L7.99 12.475a8.44 8.44 0 00-1.81 1.33l-.116.114-1.414-1.414A10.398 10.398 0 0110.965 9.5zm5.924 1.145c.85.449 1.652 1.024 2.377 1.725l.124.122-1.414 1.415a8.379 8.379 0 00-2.585-1.764l1.498-1.498zm3.241-3.24c.782.511 1.527 1.103 2.223 1.777l.175.172-1.414 1.414a12.9 12.9 0 00-2.435-1.912l1.451-1.45zM15.135 5.33l-1.743 1.745c-3.67-.393-7.478.789-10.326 3.546l-.152.15L1.5 9.354c3.702-3.702 8.87-5.044 13.635-4.026z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconWifiCrossed;
