import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconPersonWheelchair: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M8 9.498v2.26a4.5 4.5 0 105.587 7.017l.095-.093 1.414 1.414A6.5 6.5 0 118 9.498zM11 1a3 3 0 011 5.83L11.999 9H16v2h-4.001l.001.791c0 .528.205 1.032.586 1.413.541.541.93.688 1.88.752l.289.017c1.617.077 2.46.324 3.488 1.352.93.931 1.222 1.71 1.325 3.053l.027.435c.053 1.116.166 1.539.694 2.092l.075.077-1.414 1.414c-.99-.99-1.256-1.807-1.343-3.311l-.01-.177c-.055-1.166-.176-1.576-.769-2.169-.567-.567-.966-.702-2.02-.761l-.148-.008c-1.618-.077-2.46-.325-3.488-1.352a3.989 3.989 0 01-1.17-2.675L10 6.829A3.001 3.001 0 0111 1zm0 2a1 1 0 100 2 1 1 0 000-2z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconPersonWheelchair;
