import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { DivElementProps, Option, SelectData, SelectMetaData, UlElementProps } from '../../index';
import { createOptionsListItemProps, MultiSelectOptionListItem, OptionListItem } from './OptionListItem';
import { getAllOptions, getOptionGroupIndex, getSelectedOptionsPerc, getVisibleGroupLabels } from '../../utils';
import { useChangeTrigger, useContextTools } from '../hooks';

const createListOptions = (groups: SelectData['groups']) => {
  const { getData } = useContextTools();
  const trigger = useChangeTrigger();
  const { multiSelect: isMultiSelect } = getData() as SelectData;
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

export const optionsListPropSetter = (
  props: UlElementProps,
): React.PropsWithChildren<UlElementProps & { containerProps: DivElementProps }> => {
  const { getData, getMetaData } = useContextTools();
  const { open, groups } = getData() as SelectData;
  const { isSearching } = getMetaData() as SelectMetaData;
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  return {
    ...props,
    className: classNames(styles.list, hasVisibleGroupLabels && styles.shiftOptions),
    children: open && !isSearching ? createListOptions(groups) : null,
    containerProps: {
      className: styles.listContainer,
    },
  };
};

export const OptionsList = (props: React.PropsWithChildren<UlElementProps>) => {
  const { children, ...rest } = props;
  const { containerProps, ...attr } = optionsListPropSetter(rest);
  if (!children || (Array.isArray(children) && !children.length)) {
    return null;
  }
  return (
    <div {...containerProps}>
      <ul {...attr}>{children}</ul>
    </div>
  );
};
