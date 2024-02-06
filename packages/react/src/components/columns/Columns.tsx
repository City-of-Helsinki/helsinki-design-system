import React from 'react';

import '../../styles/base.module.css';
import styles from './Columns.module.css';

export type ColumnsProps = React.PropsWithChildren<Record<string, unknown>>;

export const Columns = ({ children }: ColumnsProps) => <div className={styles.columns}>{children}</div>;
