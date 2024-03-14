import React from 'react';

import styles from '../../Select.module.scss';
import { getVisibleGroupLabels } from '../../utils';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { MultiSelectListWithGroups } from './MultiSelectListWithGroups';
import { SingleSelectAndGrouplessList } from './SingleSelectAndGrouplessList';
import classNames from '../../../../utils/classNames';
import { VirtualizedList } from './listItems/VirtualizedList';

export const List = () => {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData } = dataHandlers;
  const { open, groups, multiSelect, virtualize } = getData();
  const { isSearching, refs } = getMetaData();
  const isVisible = open && !isSearching;
  const classes = classNames(styles.listContainer, !isVisible && styles.hidden);

  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const isMultiSelectAndHasGroupLabels = multiSelect && hasVisibleGroupLabels;
  const ListComponent = isMultiSelectAndHasGroupLabels ? MultiSelectListWithGroups : SingleSelectAndGrouplessList;
  return (
    <div className={classes}>
      {virtualize ? (
        <VirtualizedList isMultiSelectWithGroups={isMultiSelectAndHasGroupLabels} ref={refs.list}>
          <ListComponent />
        </VirtualizedList>
      ) : (
        <ListComponent />
      )}
    </div>
  );
};
