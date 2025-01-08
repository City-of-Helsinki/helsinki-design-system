import React from 'react';

import styles from './RequiredIndicator.module.css';
import classNames from '../../utils/classNames';

type RequiredIndicatorProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * @internal
 */
export const RequiredIndicator = ({ className, style }: RequiredIndicatorProps) => (
  <span className={classNames(styles.indicator, className)} style={style}>
    *
  </span>
);
