import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { SelectData, SelectMetaData } from '../index';
import { useContextTools } from '../../dataContext/hooks';

export const ListAndInputContainer = (props) => {
  const { getData, getMetaData } = useContextTools();
  const { open, showFiltering, showSearch } = getData() as SelectData;
  const { listContainerRef } = getMetaData() as SelectMetaData;
  const hasInput = showFiltering || showSearch;
  const { children } = props;
  return (
    <div
      className={classNames(
        styles.listAndInputContainer,
        open && styles.listAndInputContainerVisible,
        hasInput && styles.withSearchOrFilter,
      )}
      ref={listContainerRef}
    >
      {children}
    </div>
  );
};
