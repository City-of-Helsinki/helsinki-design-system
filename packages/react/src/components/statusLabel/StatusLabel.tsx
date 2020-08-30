import React from 'react';

// import core base styles
import 'hds-core';
import styles from './StatusLabel.module.css';
import classNames from '../../utils/classNames';

export type StatusLabelType = 'neutral' | 'info' | 'success' | 'alert' | 'error';

export type StatusLabelProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the status label
   */
  className?: string;
  /**
   * Adds a data-testid attribute to the root element with the given value
   */
  dataTestId?: string;
  /**
   * The type of the status label
   */
  type?: StatusLabelType;
}>;

export const StatusLabel = ({ children, className, dataTestId, type = 'neutral', ...rest }: StatusLabelProps) => (
  <span className={classNames(styles.statusLabel, styles[type], className)} data-testid={dataTestId} {...rest}>
    {children}
  </span>
);
