import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconHeadphones = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
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
        d="M12,3 C17.5228475,3 22,7.4771525 22,13 L22,18 C22,19.6568542 20.6568542,21 19,21 C17.3431458,21 16,19.6568542 16,18 L16,18 L16,14.5 L16.0068666,14.35554 C16.0795513,13.5948881 16.7203039,13 17.5,13 L17.5,13 L20,13 C20,8.581722 16.418278,5 12,5 C7.581722,5 4,8.581722 4,13 L6.5,13 C7.32842712,13 8,13.6715729 8,14.5 L8,14.5 L8,18 C8,19.6568542 6.65685425,21 5,21 C3.34314575,21 2,19.6568542 2,18 L2,18 L2,13 C2,7.4771525 6.4771525,3 12,3 Z"
      />
    </g>
  </svg>
);
