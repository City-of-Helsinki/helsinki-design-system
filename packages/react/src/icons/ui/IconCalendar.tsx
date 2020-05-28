import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

const IconCalendar: React.FC<IconProps> = ({ size = 's', className = '', style = {} }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M17 2a1 1 0 011 1v1h4v17H2V4h4V3a1 1 0 112 0v1h8V3a1 1 0 011-1zm3 9H4v8h16v-8zm0-5H4v3h16V6z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default IconCalendar;
