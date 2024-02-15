import React, { useCallback, useEffect, useRef } from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { DivElementProps, Option, SelectData, SelectMetaData, UlElementProps } from '../index';
import { createOptionsListItemProps, MultiSelectOptionListItem, OptionListItem } from './OptionListItem';
import { getAllOptions, getOptionGroupIndex, getSelectedOptionsPerc, getVisibleGroupLabels } from '../utils';
import { useChangeTrigger, useContextTools } from '../../dataContext/hooks';
import { ChangeTrigger } from '../../dataContext/DataContext';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { eventTypes } from '../groupData';

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
  }
> => {
  const { getData, getMetaData } = useContextTools();
  const { open, groups, multiSelect } = getData() as SelectData;
  const { isSearching, listContainerRef } = getMetaData() as SelectMetaData;
  const trigger = useChangeTrigger();
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  const outsideClickTrigger = () => {
    trigger({ id: 'tracker', type: eventTypes.outSideclick });
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
  };
};

export const OptionsList = (props: React.PropsWithChildren<UlElementProps>) => {
  const { children, containerProps, outsideClickTrigger, isOpen, listContainerRef, ...attr } = optionsListPropSetter(
    props,
  );
  // open state is tracked on each render, because controller data is updated in sync
  // and therefore the menu would/could close again immediately because button click will set the state open
  const openStateRef = useRef<boolean>(isOpen);
  const callback = useCallback(() => {
    if (!openStateRef.current) {
      return;
    }
    outsideClickTrigger();
  }, []);

  useEffect(() => {
    openStateRef.current = isOpen;
  });

  useOutsideClick({ ref: listContainerRef, callback });

  if (!children || (Array.isArray(children) && !children.length)) {
    return null;
  }
  return (
    <div {...containerProps}>
      <ul {...attr}>{children}</ul>
    </div>
  );
};
