import React from 'react';

import styles from './Columns.module.css';

export type ColumnsProps = React.PropsWithChildren<{}>;

const Columns: React.FC<ColumnsProps> = ({ children }: ColumnsProps) => (
  <div className={styles.columns}>{children}</div>
);

export default Columns;
