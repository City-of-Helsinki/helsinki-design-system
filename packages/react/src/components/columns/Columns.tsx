import React from 'react';

import styles from './Columns.module.css';

export type ColumnsProps = React.PropsWithChildren<{}>;

export default ({ children }: ColumnsProps) => {
  return <div className={styles.columns}>{children}</div>;
};
