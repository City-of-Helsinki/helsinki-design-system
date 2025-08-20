import React from 'react';

import styles from '../../Select.module.scss';
import { ClearAllButton } from './ClearAllButton';
import { ShowAllButton } from './ShowAllButton';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

export function TagListButtons() {
  const { getData } = useSelectDataHandlers();
  const { clearable } = getData();
  return (
    <div className={styles.tagListButtons}>
      <ShowAllButton />
      {clearable && <ClearAllButton />}
    </div>
  );
}
