import React from 'react';

import '../../styles/base.module.css';
import styles from './StatusLabel.module.scss';
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
     * Adds a data-testid attribute to the root element with the given value
     * @deprecated Will be replaced in the next major release with "data-testid"
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    dataTestId?: string;
    /**
     * The type of the status label
     */
    type?: StatusLabelType;
    /**
     * Element placed on the left side of the status label
     */
    iconStart?: React.ReactNode;
  }
>;
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
  iconStart,
  ...rest
}: StatusLabelProps) => (
  <span
    className={classNames(styles.statusLabel, styles[type], iconStart && styles.statusLabelWithIcon, className)}
    data-testid={dataTestId}
    {...rest}
  >
    {iconStart && <IconElement icon={iconStart} />}
    {children}
  </span>
);
