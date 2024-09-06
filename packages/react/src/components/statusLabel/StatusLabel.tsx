import React from 'react';

import '../../styles/base.module.css';
import styles from './StatusLabel.module.css';
import classNames from '../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type StatusLabelType = 'neutral' | 'info' | 'success' | 'alert' | 'error';

export type StatusLabelProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'span'> & {
    /**
     * Additional class names to apply to the status label
     */
    className?: string;
    /**
     * The type of the status label
     */
    type?: StatusLabelType;
    /**
     * Element placed on the left side of the status label
     */
    iconLeft?: React.ReactNode;
  }
>;
const IconElement = ({ icon }: { icon: React.ReactNode }) => (
  <span className={styles.statusLabelIcon} aria-hidden="true">
    {icon}
  </span>
);

export const StatusLabel = ({ children, className, type = 'neutral', iconLeft, ...rest }: StatusLabelProps) => (
  <span
    className={classNames(styles.statusLabel, styles[type], iconLeft && styles.statusLabelWithIcon, className)}
    {...rest}
  >
    {iconLeft && <IconElement icon={iconLeft} />}
    {children}
  </span>
);
