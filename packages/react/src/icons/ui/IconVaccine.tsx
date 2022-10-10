import React from 'react';

import { IconProps } from '../Icon.interface';
import classNames from '../../utils/classNames';
import styles from '../Icon.module.css';

export const IconVaccine = ({ size = 's', className = '', style = {}, ...rest }: IconProps) => (
  <svg
    className={classNames(styles.icon, styles[size], className)}
    style={style}
    {...rest}
    role="img"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="m18.3359 4.25001-1.0429-1.04289 1.4142-1.41421 3.5 3.5-1.4142 1.41421-1.0429-1.04289-1.2818 1.28173 1.946 1.94595-9.5223 9.52229-1.25466-1.2546-.94594.946-.69133-.6914-4.79289 4.7929-1.41421-1.4142 4.79289-4.7929-.72289-.7229.94595-.9459-1.22306-1.2231 9.52234-9.5223 1.9459 1.94595zm-9.92161 8.85809 2.47771 2.4777 6.6939-6.69389-2.4777-2.47768z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
