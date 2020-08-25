import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Columns.module.css';

export type ColumnsProps = React.PropsWithChildren<{}>;

export function Columns({ children }: ColumnsProps) {
  return <div className={styles.columns}>{children}</div>;
}
