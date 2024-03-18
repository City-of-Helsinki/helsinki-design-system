import React from 'react';

import styles from '../../Select.module.scss';
import { DROPDOWN_MENU_ITEM_HEIGHT, getVisibleGroupLabels } from '../../utils';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { MultiSelectListWithGroups } from './MultiSelectListWithGroups';
import { SingleSelectAndGrouplessList } from './SingleSelectAndGrouplessList';
import classNames from '../../../../utils/classNames';

export const List = () => {
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData } = dataHandlers;
  const { open, groups, multiSelect, visibleOptions } = getData();
  const { isSearching } = getMetaData();
  const isVisible = open && !isSearching;
  const classes = classNames(styles.listContainer, !isVisible && styles.hidden);
  const styleObj = { maxHeight: DROPDOWN_MENU_ITEM_HEIGHT * visibleOptions };

  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const isMultiSelectAndHasGroupLabels = multiSelect && hasVisibleGroupLabels;
  return (
    <div className={classes} style={styleObj}>
      {isMultiSelectAndHasGroupLabels ? <MultiSelectListWithGroups /> : <SingleSelectAndGrouplessList />}
    </div>
  );
};
