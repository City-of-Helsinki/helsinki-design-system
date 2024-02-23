import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps, Option, SelectData, SelectMetaData, UlElementProps } from '../types';
import { createOptionsListItemProps, MultiSelectOptionListItem, OptionListItem } from './OptionListItem';
import { getAllOptions, getOptionGroupIndex, getSelectedOptionsPerc, getVisibleGroupLabels } from '../utils';
import { useChangeTrigger, useContextDataHandlers } from '../../dataProvider/hooks';
import { ChangeTrigger } from '../../dataProvider/DataContext';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { eventIds, eventTypes } from '../events';
import { VirtualizedListElement } from './VirtualizedListElement';

const createListOptions = (groups: SelectData['groups'], trigger: ChangeTrigger, isMultiSelect: boolean) => {
  const getGroupLabelIntermediateState = (option: Option): boolean => {
    if (!option.isGroupLabel || option.selected) {
      return false;
    }
    const optionGroup = groups[getOptionGroupIndex(groups, option)];
    const perc = optionGroup ? getSelectedOptionsPerc(optionGroup) : 0;
    return perc < 1 && perc > 0;
  };
  return getAllOptions(groups, false)
    .map((option) => {
      const { children, ...attr } = createOptionsListItemProps({
        option,
        isMultiSelect,
        isIntermediate: getGroupLabelIntermediateState(option),
        trigger,
      });
      if (!option.visible) {
        return null;
      }
      const Component = isMultiSelect ? MultiSelectOptionListItem : OptionListItem;
      return (
        <Component {...attr} key={option.value as string}>
          {children}
        </Component>
      );
    })
    .filter((option) => !!option);
};

const optionsListPropSetter = (
  props: UlElementProps,
): React.PropsWithChildren<
  UlElementProps & {
    containerProps: DivElementProps;
    outsideClickTrigger: () => void;
    isOpen: boolean;
    listContainerRef: SelectMetaData['listContainerRef'];
    virtualize: boolean;
    listRef: SelectMetaData['listRef'];
  }
> => {
  const { getData, getMetaData } = useContextDataHandlers();
  const { open, groups, multiSelect, virtualize } = getData() as SelectData;
  const { isSearching, listContainerRef, listRef } = getMetaData() as SelectMetaData;
  const trigger = useChangeTrigger();
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const outsideClickTrigger = () => {
    trigger({ id: eventIds.generic, type: eventTypes.outSideClick });
  };
  return {
    ...props,
    className: classNames(styles.list, hasVisibleGroupLabels && styles.shiftOptions),
    children: open && !isSearching ? createListOptions(groups, trigger, multiSelect) : null,
    containerProps: {
      className: styles.listContainer,
    },
    outsideClickTrigger,
    isOpen: open,
    listContainerRef,
    listRef,
    virtualize,
    tabIndex: -1,
  };
};

export const OptionsList = (props: React.PropsWithChildren<UlElementProps>) => {
  const {
    children,
    containerProps,
    outsideClickTrigger,
    isOpen,
    listRef,
    listContainerRef,
    virtualize,
    ...attr
  } = optionsListPropSetter(props);
  const callback = () => {
    if (!isOpen) {
      return;
    }
    outsideClickTrigger();
  };

  useOutsideClick({ ref: listContainerRef, callback });
  if (!children || (Array.isArray(children) && !children.length)) {
    return null;
  }
  return (
    <div {...containerProps}>
      {virtualize ? (
        <VirtualizedListElement {...attr} ref={listRef}>
          {children}
        </VirtualizedListElement>
      ) : (
        <ul {...attr} ref={listRef}>
          {children}
        </ul>
      )}
    </div>
  );
};
