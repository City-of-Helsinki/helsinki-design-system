import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Columns.module.css';

export type ColumnsProps = React.PropsWithChildren<Record<string, unknown>>;

export const Columns = ({ children }: ColumnsProps) => <div className={styles.columns}>{children}</div>;
