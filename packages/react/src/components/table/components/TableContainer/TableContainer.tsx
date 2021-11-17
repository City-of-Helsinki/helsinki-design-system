import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../../../utils/classNames';
import styles from '../../Table.module.scss';

export type TableContainerProps = React.ComponentPropsWithoutRef<'table'> & {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  dense?: boolean;
  zebra?: boolean;
  verticalLines?: boolean;
  customThemeClass?: string;
  headingId?: string;
};

export const TableContainer = ({
  children,
  variant = 'dark',
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
        className={classNames(
          styles.table,
          variant === 'dark' ? styles.dark : styles.light,
          dense && styles.dense,
          zebra && styles.zebra,
          verticalLines && styles.verticalLines,
          customThemeClass,
        )}
        aria-labelledby={headingId}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
};
