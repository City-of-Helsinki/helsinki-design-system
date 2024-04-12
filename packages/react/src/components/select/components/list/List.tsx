import React from 'react';

import styles from '../../Select.module.scss';
import { DROPDOWN_MENU_ITEM_HEIGHT, getVisibleGroupLabels } from '../../utils';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { MultiSelectListWithGroups } from './MultiSelectListWithGroups';
import { SingleSelectAndGrouplessList } from './SingleSelectAndGrouplessList';
import { SingleSelectListWithGroups } from './SingleSelectListWithGroups';
import classNames from '../../../../utils/classNames';
import { VirtualizedLists } from './VirtualizedLists';

export const List = () => {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData } = dataHandlers;
  const { open, groups, multiSelect, visibleOptions, virtualize } = getData();
  const { isSearching } = getMetaData();
  const isVisible = open && !isSearching;
  const classes = classNames(styles.listContainer, !isVisible && styles.hidden);
  const styleObj = { maxHeight: DROPDOWN_MENU_ITEM_HEIGHT * visibleOptions };

  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const isMultiSelectAndHasGroupLabels = multiSelect && hasVisibleGroupLabels;
  const ListComponent = () => {
    if (virtualize) {
      return <VirtualizedLists forMultiSelectWithGroups={isMultiSelectAndHasGroupLabels} />;
    }
    if (!multiSelect) {
      return hasVisibleGroupLabels ? <SingleSelectListWithGroups /> : <SingleSelectAndGrouplessList />;
    }
    return <MultiSelectListWithGroups />;
  };
  return (
    <div className={classes} style={styleObj}>
      <ListComponent />
    </div>
  );
};
