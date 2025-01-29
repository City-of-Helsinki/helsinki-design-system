import React, { useEffect } from 'react';

import styles from '../../Select.module.scss';
import { DROPDOWN_MENU_ITEM_HEIGHT, getVisibleGroupLabels } from '../../utils';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
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
  const dataHandlers = useSelectDataHandlers();
  const { getData, getMetaData } = dataHandlers;
  const { open, groups, multiSelect, visibleOptions, virtualize } = getData();
  const { isSearching } = getMetaData();
  const isVisible = open && !isSearching;
  const classes = classNames(styles.listContainer, !isVisible && styles.hidden);
  const styleObj = { maxHeight: DROPDOWN_MENU_ITEM_HEIGHT * visibleOptions };

  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const isMultiSelectAndHasGroupLabels = multiSelect && hasVisibleGroupLabels;

  useEffect(() => {
    let isListenerActive = false;

    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown'].includes(event.code)) {
        event.preventDefault();
      }
    };

    const onClose = () => {
      if (isListenerActive) {
        window.removeEventListener('keydown', onKeyDown);
        isListenerActive = false;
      }
    };

    const onOpen = () => {
      if (!isListenerActive) {
        window.addEventListener('keydown', onKeyDown, {
          capture: true,
          passive: false,
        });
        isListenerActive = true;
      }
    };

    if (isVisible) {
      onOpen();
    } else {
      onClose();
    }

    return onClose;
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
