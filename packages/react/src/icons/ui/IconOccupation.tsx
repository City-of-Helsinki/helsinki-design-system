import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconOccupation = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    {...rest}
    role="img"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="currentColor">
      <g clipRule="evenodd" fillRule="evenodd">
        <path d="m6 2c0-1.10457.89543-2 2-2h8c1.1046 0 2 .89543 2 2v2h-2v-2h-8v2h-2z" />
        <path d="m0 6c0-1.10457.89543-2 2-2h20c1.1046 0 2 .89543 2 2v4.2996c0 .841-.5261 1.5921-1.3165 1.8796l-10 3.6363c-.4415.1606-.9254.1606-1.3669 0l-10.00008-3.6363c-.790383-.2875-1.31652-1.0386-1.31652-1.8796zm22 0h-20v4.2996l10 3.6363 10-3.6363z" />
        <path d="m24 9v13c0 1.1046-.8954 2-2 2h-20c-1.104571 0-2-.8954-2-2v-12.49998h2v12.49998h20v-13z" />
      </g>
      <path d="m13 11c0 .5523-.4477 1-1 1s-1-.4477-1-1 .4477-1 1-1 1 .4477 1 1z" />
    </g>
  </svg>
);
