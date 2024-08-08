import React from 'react';

import '../../styles/base.module.css';
import styles from './Columns.module.css';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';
import classNames from '../../utils/classNames';

export type ColumnsProps = React.PropsWithChildren<AllElementPropsWithoutRef<'div'>>;

export const Columns = ({ children, className, ...rest }: ColumnsProps) => (
  <div className={classNames(styles.columns, className)} {...rest}>
    {children}
  </div>
);
