import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import styles from './Table.module.scss';
import { TableBody } from './TableBody';
import { HeaderRow } from './HeaderRow';
import { VerticalHeaderColGroup } from './VerticalHeaderColGroup';
import { SortingHeaderCell } from './SortingHeaderCell';

export type TableProps = React.ComponentPropsWithoutRef<'table'> & {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  dense?: boolean;
  zebra?: boolean;
  verticalLines?: boolean;
};

export const Table = ({
  children,
  variant = 'dark',
  dense = false,
  zebra = false,
  verticalLines = false,
  ...rest
}: TableProps) => {
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
        )}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
};

Table.TableBody = TableBody;
Table.HeaderRow = HeaderRow;
Table.VerticalHeaderColGroup = VerticalHeaderColGroup;
Table.SortingHeaderCell = SortingHeaderCell;
