import React from 'react';

import styles from './RequiredIndicator.module.css';
import classNames from '../../utils/classNames';

type RequiredIndicatorProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const RequiredIndicator = ({ className, style }: RequiredIndicatorProps) => (
  <span aria-hidden className={classNames(styles.indicator, className)} style={style}>
    *
  </span>
);
