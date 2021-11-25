import React from 'react';

import styles from '../../Table.module.scss';

export const VerticalHeaderColGroup = () => {
  return (
    <colgroup>
      <col span={1} className={styles.verticalHeaderColumn} />
    </colgroup>
  );
};
