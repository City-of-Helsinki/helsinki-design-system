import React from 'react';

import '../../../../styles/base.module.css';
import classNames from '../../../../utils/classNames';
import styles from '../../Table.module.scss';

export type TableContainerProps = {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  id: string;
  dense?: boolean;
  zebra?: boolean;
  verticalLines?: boolean;
  customThemeClass?: string;
  headingId?: string;
} & React.ComponentPropsWithoutRef<'table'>;

export const TableContainer = ({
  children,
  className,
  variant = 'dark',
  id,
  dense = false,
  zebra = false,
  verticalLines = false,
  customThemeClass,
  headingId,
  ...rest
}: TableContainerProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div tabIndex={0} className={styles.container}>
      <table
        {...rest}
        className={classNames(
          styles.table,
          variant === 'dark' ? styles.dark : styles.light,
          dense && styles.dense,
          zebra && styles.zebra,
          verticalLines && styles.verticalLines,
          customThemeClass,
          className,
        )}
        aria-labelledby={headingId}
        id={id}
      >
        {children}
      </table>
    </div>
  );
};
