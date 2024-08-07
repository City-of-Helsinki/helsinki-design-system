import React from 'react';

import styles from '../../Select.module.scss';
import { DROPDOWN_MENU_ITEM_HEIGHT, getVisibleGroupLabels } from '../../utils';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { MultiSelectListWithGroups } from './MultiSelectListWithGroups';
import { SingleSelectAndGrouplessList } from './SingleSelectAndGrouplessList';
import { SingleSelectListWithGroups } from './SingleSelectListWithGroups';
import classNames from '../../../../utils/classNames';

const ListComponent = ({
  multiSelect,
  isMultiSelectAndHasGroupLabels,
  hasVisibleGroupLabels,
}: {
  multiSelect: boolean;
  isMultiSelectAndHasGroupLabels: boolean;
  hasVisibleGroupLabels: boolean;
}) => {
  if (!multiSelect) {
    return hasVisibleGroupLabels ? <SingleSelectListWithGroups /> : <SingleSelectAndGrouplessList />;
  }
  return isMultiSelectAndHasGroupLabels ? <MultiSelectListWithGroups /> : <SingleSelectAndGrouplessList />;
};

export const List = () => {
  const dataHandlers = useSelectDataHandlers();
  const { getData } = dataHandlers;
  const { open, groups, multiSelect, visibleOptions } = getData();
  const isVisible = open;
  const classes = classNames(styles.listContainer, !isVisible && styles.hidden);
  const styleObj = { maxHeight: DROPDOWN_MENU_ITEM_HEIGHT * visibleOptions };
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const isMultiSelectAndHasGroupLabels = multiSelect && hasVisibleGroupLabels;

  return (
    <div className={classes} style={styleObj}>
      <ListComponent
        multiSelect={multiSelect}
        isMultiSelectAndHasGroupLabels={isMultiSelectAndHasGroupLabels}
        hasVisibleGroupLabels={hasVisibleGroupLabels}
      />
    </div>
  );
};
