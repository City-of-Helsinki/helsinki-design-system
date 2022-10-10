import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconEntrepreneur = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    {...rest}
    role="img"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipRule="evenodd" fill="currentColor" fillRule="evenodd">
      <path d="m12 9c1.933 0 3.5-1.567 3.5-3.5s-1.567-3.5-3.5-3.5-3.5 1.567-3.5 3.5 1.567 3.5 3.5 3.5zm0 2c3.0376 0 5.5-2.46243 5.5-5.5s-2.4624-5.5-5.5-5.5c-3.03757 0-5.5 2.46243-5.5 5.5s2.46243 5.5 5.5 5.5z" />
      <path d="m3 15c-.55228 0-1 .4477-1 1v8h-2v-8c0-1.6569 1.34315-3 3-3h18c1.6569 0 3 1.3431 3 3v8h-2v-8c0-.5523-.4477-1-1-1z" />
      <path d="m6 15h3l3 4.2795 3-4.2795h3v7h-5v2h-2v-2h-5zm2 2.1205v2.8795h2.0568zm5.9432 2.8795 2.0568-2.8795v2.8795z" />
    </g>
  </svg>
);
