import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { Controller, DefaultGroupElementProps, PropSetter } from '../../group/utils';
import { Option, SelectData, UlElementProps } from '../index';
import { createOptionsListItemProps, MultiSelectOptionListItem, OptionListItem } from './OptionListItem';
import {
  getAllOptions,
  getMetaDataFromController,
  getMultiSelectState,
  getOptionGroupIndex,
  getSelectDataFromController,
  getSelectedOptionsPerc,
  getVisibleGroupLabels,
} from '../utils';

const createListOptions = (groups: SelectData['groups'], controller: Controller) => {
  const isMultiSelect = getMultiSelectState(controller);
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
        controller,
        isMultiSelect,
        isIntermediate: getGroupLabelIntermediateState(option),
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

export const optionsListPropSetter: PropSetter<UlElementProps> = ({ controller }) => {
  const { open, groups } = getSelectDataFromController(controller);
  const { isSearching } = getMetaDataFromController(controller);
  const hasVisibleGroupLabels = getVisibleGroupLabels(groups).length > 0;
  return {
    className: classNames(styles.list, hasVisibleGroupLabels && styles.shiftOptions),
    children: open && !isSearching ? createListOptions(groups, controller) : null,
    containerProps: {
      className: styles.listContainer,
    },
  };
};

export const OptionsList = (props: React.PropsWithChildren<DefaultGroupElementProps>) => {
  const { children, containerProps, ...attr } = props;
  if (!children || (Array.isArray(children) && !children.length)) {
    return null;
  }
  return (
    <div {...containerProps}>
      <ul {...attr}>{children}</ul>
    </div>
  );
};
