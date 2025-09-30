import React, { useEffect } from 'react';

import styles from '../ModularOptionList.module.scss';
import { DROPDOWN_MENU_ITEM_HEIGHT, getVisibleGroupLabels } from '../utils';
import { useModularOptionListDataHandlers } from '../hooks/useModularOptionListDataHandlers';
import { MultiSelectListWithGroups } from './MultiSelectListWithGroups';
import { SingleSelectAndGrouplessList } from './SingleSelectAndGrouplessList';
import { SingleSelectListWithGroups } from './SingleSelectListWithGroups';
import classNames from '../../../../utils/classNames';
import { VirtualizedLists } from './VirtualizedLists';

const ListComponent = ({
  virtualize,
  multiSelect,
  isMultiSelectAndHasGroupLabels,
  hasVisibleGroupLabels,
}: {
  virtualize: boolean;
  multiSelect: boolean;
  isMultiSelectAndHasGroupLabels: boolean;
  hasVisibleGroupLabels: boolean;
}) => {
  if (virtualize) {
    return <VirtualizedLists forMultiSelectWithGroups={isMultiSelectAndHasGroupLabels} />;
  }
  if (!multiSelect) {
    return hasVisibleGroupLabels ? <SingleSelectListWithGroups /> : <SingleSelectAndGrouplessList />;
  }
  return isMultiSelectAndHasGroupLabels ? <MultiSelectListWithGroups /> : <SingleSelectAndGrouplessList />;
};

export const List = () => {
  const dataHandlers = useModularOptionListDataHandlers();
  const { getData } = dataHandlers;
  const { groups, multiSelect, visibleOptions, virtualize } = getData();
  const isVisible = true; // TODO !isSearching;
  const classes = classNames(styles.listContainer, { [`${styles.hidden}`]: !isVisible });
  const styleObj = { maxHeight: DROPDOWN_MENU_ITEM_HEIGHT * visibleOptions };

  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const isMultiSelectAndHasGroupLabels = multiSelect && hasVisibleGroupLabels;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown'].includes(event.code)) {
        event.preventDefault();
      }
    };

    if (isVisible) {
      window.addEventListener('keydown', onKeyDown);
    } else {
      window.removeEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isVisible]);

  return (
    <div className={classes} style={styleObj}>
      <ListComponent
        multiSelect={multiSelect}
        isMultiSelectAndHasGroupLabels={isMultiSelectAndHasGroupLabels}
        virtualize={virtualize}
        hasVisibleGroupLabels={hasVisibleGroupLabels}
      />
    </div>
  );
};
