import React from 'react';
// import base styles
import '../../styles/base.css';

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
  /**
   * Element placed on the left side of the status label
   */
  iconLeft?: React.ReactNode;
}>;

const IconElement = ({ icon }: { icon: React.ReactNode }) => (
  <span className={styles.statusLabelIcon} aria-hidden="true">
    {icon}
  </span>
);

export const StatusLabel = ({
  children,
  className,
  dataTestId,
  type = 'neutral',
  iconLeft,
  ...rest
}: StatusLabelProps) => (
  <span
    className={classNames(styles.statusLabel, styles[type], iconLeft && styles.statusLabelWithIcon, className)}
    data-testid={dataTestId}
    {...rest}
  >
    {iconLeft && <IconElement icon={iconLeft} />}
    {children}
  </span>
);
