import React, { CSSProperties, FC } from 'react';

import styles from './RequiredIndicator.module.css';
import classNames from '../../utils/classNames';

type RequiredIndicatorProps = {
  className?: string;
  style?: CSSProperties;
};

const RequiredIndicator: FC<RequiredIndicatorProps> = ({ className, style }: RequiredIndicatorProps) => (
  <span className={classNames(styles.indicator, className)} style={style}>
    *
  </span>
);

export default RequiredIndicator;
