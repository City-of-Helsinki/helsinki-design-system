import React from 'react';

import styles from '../../Table.module.scss';

export const HeaderRow = ({ children }) => {
  return <tr className={styles.headerRow}>{children}</tr>;
};
